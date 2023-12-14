/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Root {
  payload: Payload
  title: string
}

export interface Payload {
  path: string
  currentUser: CurrentUser
  tree: Tree
  fileTree: Tree
}

export interface CurrentUser {
  id: number
  login: string
  userEmail: string
}

export interface Tree {
  items: ItemType[]
}

export interface ItemType {
  name: string
  path: string
  contentType: string
  items?: any
}
