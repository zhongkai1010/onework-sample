import inboundApi from './inbound'
import outboundApi from './outbound'
import transferApi from './transfer'
import warehouseApi from './warehouse'

export default [...inboundApi, ...outboundApi, ...transferApi, ...warehouseApi]
