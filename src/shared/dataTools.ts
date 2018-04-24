import {Map, List} from 'immutable'

export function mapFromProperty<K, V> (items: List<V>, property: string): Map<K, V> {
  if (items.isEmpty()) {
    return Map<K, V>()
  }
  return items.reduce((map: Map<K, V>, item: V) => map.set(item[property], item), Map<K, V>())
}