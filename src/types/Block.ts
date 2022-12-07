import Connection from './Connection'

interface Block {
  id: number,
  coordTop: number,
  coordLeft: number,
  connections: Array<Connection>
}

export default Block