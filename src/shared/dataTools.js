import {Map} from 'immutable'

export const mapFromProperty = (items, property) => {
  if (items.isEmpty()) {
    return Map()
  }
  return items.reduce((map, item) => map.set(item[property], item), Map())
}