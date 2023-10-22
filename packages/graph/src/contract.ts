import {
  Add as AddEvent,
  Executed as ExecutedEvent
} from "../generated/Contract/Contract"
import {
  Add,
  Executed
} from "../generated/schema"

import { sendPushNotification } from "./push"

export function handleAdd(event: AddEvent): void {
  let entity = new Add(event.transaction.hash.concatI32(event.logIndex.toI32()))
  entity.sender = event.params.sender
  entity.receiver = event.params.receiver
  entity.orderIndex = event.params.orderIndex
  entity.order_orderStatus = event.params.order.orderStatus
  entity.order_orderType = event.params.order.orderType
  entity.order_orderRole = event.params.order.orderRole
  entity.order_owner = event.params.order.owner
  entity.order_receiver = event.params.order.receiver
  entity.order_pool = event.params.order.pool
  entity.order_positionManager = event.params.order.positionManager
  entity.order_token0 = event.params.order.token0
  entity.order_token1 = event.params.order.token1
  entity.order_positionId = event.params.order.positionId
  entity.order_amountLiquidity = event.params.order.amountLiquidity
  entity.order_minAmountToken0Usd = event.params.order.minAmountToken0Usd
  entity.order_minAmountToken1Usd = event.params.order.minAmountToken1Usd

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  let recipient = entity.order_receiver.toHexString(),
  type = "3",
  title = "PUSH Received",
  body = `Add liquidity ${entity.order_amountLiquidity} PUSH from ${ entity.sender.toHexString()}`,
  subject = "PUSH Received",
  message = `Add liquidity ${entity.order_amountLiquidity} PUSH from ${ entity.sender.toHexString()}`,
  image = "https://play-lh.googleusercontent.com/i911_wMmFilaAAOTLvlQJZMXoxBF34BMSzRmascHezvurtslYUgOHamxgEnMXTklsF-S",
  secret = "null",
  cta = "https://epns.io/"

  let notification = `{\"type\": \"${type}\", \"title\": \"${title}\", \"body\": \"${body}\", \"subject\": \"${subject}\", \"message\": \"${message}\", \"image\": \"${image}\", \"secret\": \"${secret}\", \"cta\": \"${cta}\"}`

  sendPushNotification (recipient, notification)
}

export function handleExecuted(event: ExecutedEvent): void {
  let entity = new Executed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.sender = event.params.sender
  entity.orderIndex = event.params.orderIndex
  entity.order_orderStatus = event.params.order.orderStatus
  entity.order_orderType = event.params.order.orderType
  entity.order_orderRole = event.params.order.orderRole
  entity.order_owner = event.params.order.owner
  entity.order_receiver = event.params.order.receiver
  entity.order_pool = event.params.order.pool
  entity.order_positionManager = event.params.order.positionManager
  entity.order_token0 = event.params.order.token0
  entity.order_token1 = event.params.order.token1
  entity.order_positionId = event.params.order.positionId
  entity.order_amountLiquidity = event.params.order.amountLiquidity
  entity.order_minAmountToken0Usd = event.params.order.minAmountToken0Usd
  entity.order_minAmountToken1Usd = event.params.order.minAmountToken1Usd

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  let recipient = entity.order_receiver.toHexString(),
  type = "3",
  title = "PUSH Received",
  body = `Executed liquidity ${entity.order_amountLiquidity}`,
  subject = "PUSH Received",
  message = `Executed liquidity ${entity.order_amountLiquidity}`,
  image = "https://play-lh.googleusercontent.com/i911_wMmFilaAAOTLvlQJZMXoxBF34BMSzRmascHezvurtslYUgOHamxgEnMXTklsF-S",
  secret = "null",
  cta = "https://epns.io/"

  let notification = `{\"type\": \"${type}\", \"title\": \"${title}\", \"body\": \"${body}\", \"subject\": \"${subject}\", \"message\": \"${message}\", \"image\": \"${image}\", \"secret\": \"${secret}\", \"cta\": \"${cta}\"}`

  sendPushNotification (recipient, notification)
}


export const subgraphID = "youtpout/liquisafe" 