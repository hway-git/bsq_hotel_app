import type { PaginationParams } from '../type'
import { alovaInstance } from '../core/instance'

export interface Article {
  id: number
  title: string
  content: string
  created_at: string
  updated_at: string
  deleted_at: string | null
  tags: string[]
  is_recommend: boolean
  cover: string
  images: string[]
}

export const getList = (data: PaginationParams) => alovaInstance.Get('/v1/article/', { params: data })

export const getDetail = (id: string) => alovaInstance.Get(`/v1/article/${id}/`)
