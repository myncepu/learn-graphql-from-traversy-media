/*
 * schema.js
 * Copyright (C) 2018 yanpengqiang <yan2010@live.com>
 *
 * Distributed under terms of the MIT license.
 */

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} from 'graphql'
import axios from 'axios'

// const customers = [
//   { id: '1', name: 'Yan Pengqiang', email: 'admin@yanpengqiang.com', age: 29 },
//   { id: '2', name: 'Li Luning', email: 'admin@yanpengqiang.com', age: 29 },
//   { id: '3', name: 'Li Chao', email: 'admin@yanpengqiang.com', age: 29 },
//   { id: '4', name: 'Jin Pu', email: 'admin@yanpengqiang.com', age: 29 },
// ]

const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    customer: {
      type: CustomerType,
      args: {
        id: { type: GraphQLString },
      },
      resolve(parentValue, args) {
        // return customers.find((customer) => customer.id === args.id)
        return axios.get(`http://localhost:3000/customers/${args.id}`)
          .then(res => res.data)
      }
    },
    customers: {
      type: GraphQLList(CustomerType),
      // resolve(parentValue, args) {
      resolve() {
        // return customers
        return axios.get('http://localhost:3000/customers')
          .then(res => res.data)
      }
    }
  },
})

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addCustomer: {
      type: CustomerType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parentValue, args) {
        return axios.post('http://localhost:3000/customers', {
          name: args.name,
          email: args.email,
          age: args.age,
        }).then(res => res.data)
      }
    },
    deleteCustomer: {
      type: CustomerType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, args) {
        return axios.delete(`http://localhost:3000/customers/${args.id}`)
          .then(res => res.data)
      }
    },
    editCustomer: {
      type: CustomerType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(parentValue, args) {
        return axios.patch(`http://localhost:3000/customers/${args.id}`, args)
          .then(res => res.data)
      }
    },
  }
})
export default new GraphQLSchema({
  query: RootQuery,
  mutation,
})
