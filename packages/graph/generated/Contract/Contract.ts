// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class Add extends ethereum.Event {
  get params(): Add__Params {
    return new Add__Params(this);
  }
}

export class Add__Params {
  _event: Add;

  constructor(event: Add) {
    this._event = event;
  }

  get sender(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get receiver(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get orderIndex(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get order(): AddOrderStruct {
    return changetype<AddOrderStruct>(
      this._event.parameters[3].value.toTuple()
    );
  }
}

export class AddOrderStruct extends ethereum.Tuple {
  get orderStatus(): i32 {
    return this[0].toI32();
  }

  get orderType(): i32 {
    return this[1].toI32();
  }

  get orderRole(): i32 {
    return this[2].toI32();
  }

  get owner(): Address {
    return this[3].toAddress();
  }

  get receiver(): Address {
    return this[4].toAddress();
  }

  get pool(): Address {
    return this[5].toAddress();
  }

  get positionManager(): Address {
    return this[6].toAddress();
  }

  get token0(): Address {
    return this[7].toAddress();
  }

  get token1(): Address {
    return this[8].toAddress();
  }

  get positionId(): BigInt {
    return this[9].toBigInt();
  }

  get amountLiquidity(): BigInt {
    return this[10].toBigInt();
  }

  get minAmountToken0Usd(): BigInt {
    return this[11].toBigInt();
  }

  get minAmountToken1Usd(): BigInt {
    return this[12].toBigInt();
  }
}

export class Executed extends ethereum.Event {
  get params(): Executed__Params {
    return new Executed__Params(this);
  }
}

export class Executed__Params {
  _event: Executed;

  constructor(event: Executed) {
    this._event = event;
  }

  get sender(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get orderIndex(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get order(): ExecutedOrderStruct {
    return changetype<ExecutedOrderStruct>(
      this._event.parameters[2].value.toTuple()
    );
  }
}

export class ExecutedOrderStruct extends ethereum.Tuple {
  get orderStatus(): i32 {
    return this[0].toI32();
  }

  get orderType(): i32 {
    return this[1].toI32();
  }

  get orderRole(): i32 {
    return this[2].toI32();
  }

  get owner(): Address {
    return this[3].toAddress();
  }

  get receiver(): Address {
    return this[4].toAddress();
  }

  get pool(): Address {
    return this[5].toAddress();
  }

  get positionManager(): Address {
    return this[6].toAddress();
  }

  get token0(): Address {
    return this[7].toAddress();
  }

  get token1(): Address {
    return this[8].toAddress();
  }

  get positionId(): BigInt {
    return this[9].toBigInt();
  }

  get amountLiquidity(): BigInt {
    return this[10].toBigInt();
  }

  get minAmountToken0Usd(): BigInt {
    return this[11].toBigInt();
  }

  get minAmountToken1Usd(): BigInt {
    return this[12].toBigInt();
  }
}

export class Initialized extends ethereum.Event {
  get params(): Initialized__Params {
    return new Initialized__Params(this);
  }
}

export class Initialized__Params {
  _event: Initialized;

  constructor(event: Initialized) {
    this._event = event;
  }

  get version(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class RoleAdminChanged extends ethereum.Event {
  get params(): RoleAdminChanged__Params {
    return new RoleAdminChanged__Params(this);
  }
}

export class RoleAdminChanged__Params {
  _event: RoleAdminChanged;

  constructor(event: RoleAdminChanged) {
    this._event = event;
  }

  get role(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get previousAdminRole(): Bytes {
    return this._event.parameters[1].value.toBytes();
  }

  get newAdminRole(): Bytes {
    return this._event.parameters[2].value.toBytes();
  }
}

export class RoleGranted extends ethereum.Event {
  get params(): RoleGranted__Params {
    return new RoleGranted__Params(this);
  }
}

export class RoleGranted__Params {
  _event: RoleGranted;

  constructor(event: RoleGranted) {
    this._event = event;
  }

  get role(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get account(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get sender(): Address {
    return this._event.parameters[2].value.toAddress();
  }
}

export class RoleRevoked extends ethereum.Event {
  get params(): RoleRevoked__Params {
    return new RoleRevoked__Params(this);
  }
}

export class RoleRevoked__Params {
  _event: RoleRevoked;

  constructor(event: RoleRevoked) {
    this._event = event;
  }

  get role(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get account(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get sender(): Address {
    return this._event.parameters[2].value.toAddress();
  }
}

export class Contract__allOrdersResult {
  value0: i32;
  value1: i32;
  value2: i32;
  value3: Address;
  value4: Address;
  value5: Address;
  value6: Address;
  value7: Address;
  value8: Address;
  value9: BigInt;
  value10: BigInt;
  value11: BigInt;
  value12: BigInt;

  constructor(
    value0: i32,
    value1: i32,
    value2: i32,
    value3: Address,
    value4: Address,
    value5: Address,
    value6: Address,
    value7: Address,
    value8: Address,
    value9: BigInt,
    value10: BigInt,
    value11: BigInt,
    value12: BigInt
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
    this.value5 = value5;
    this.value6 = value6;
    this.value7 = value7;
    this.value8 = value8;
    this.value9 = value9;
    this.value10 = value10;
    this.value11 = value11;
    this.value12 = value12;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set(
      "value0",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(this.value0))
    );
    map.set(
      "value1",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(this.value1))
    );
    map.set(
      "value2",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(this.value2))
    );
    map.set("value3", ethereum.Value.fromAddress(this.value3));
    map.set("value4", ethereum.Value.fromAddress(this.value4));
    map.set("value5", ethereum.Value.fromAddress(this.value5));
    map.set("value6", ethereum.Value.fromAddress(this.value6));
    map.set("value7", ethereum.Value.fromAddress(this.value7));
    map.set("value8", ethereum.Value.fromAddress(this.value8));
    map.set("value9", ethereum.Value.fromUnsignedBigInt(this.value9));
    map.set("value10", ethereum.Value.fromUnsignedBigInt(this.value10));
    map.set("value11", ethereum.Value.fromUnsignedBigInt(this.value11));
    map.set("value12", ethereum.Value.fromUnsignedBigInt(this.value12));
    return map;
  }

  getOrderStatus(): i32 {
    return this.value0;
  }

  getOrderType(): i32 {
    return this.value1;
  }

  getOrderRole(): i32 {
    return this.value2;
  }

  getOwner(): Address {
    return this.value3;
  }

  getReceiver(): Address {
    return this.value4;
  }

  getPool(): Address {
    return this.value5;
  }

  getPositionManager(): Address {
    return this.value6;
  }

  getToken0(): Address {
    return this.value7;
  }

  getToken1(): Address {
    return this.value8;
  }

  getPositionId(): BigInt {
    return this.value9;
  }

  getAmountLiquidity(): BigInt {
    return this.value10;
  }

  getMinAmountToken0Usd(): BigInt {
    return this.value11;
  }

  getMinAmountToken1Usd(): BigInt {
    return this.value12;
  }
}

export class Contract__fetchPageOrdersResultValuesStruct extends ethereum.Tuple {
  get orderStatus(): i32 {
    return this[0].toI32();
  }

  get orderType(): i32 {
    return this[1].toI32();
  }

  get orderRole(): i32 {
    return this[2].toI32();
  }

  get owner(): Address {
    return this[3].toAddress();
  }

  get receiver(): Address {
    return this[4].toAddress();
  }

  get pool(): Address {
    return this[5].toAddress();
  }

  get positionManager(): Address {
    return this[6].toAddress();
  }

  get token0(): Address {
    return this[7].toAddress();
  }

  get token1(): Address {
    return this[8].toAddress();
  }

  get positionId(): BigInt {
    return this[9].toBigInt();
  }

  get amountLiquidity(): BigInt {
    return this[10].toBigInt();
  }

  get minAmountToken0Usd(): BigInt {
    return this[11].toBigInt();
  }

  get minAmountToken1Usd(): BigInt {
    return this[12].toBigInt();
  }
}

export class Contract__fetchPageOrdersResult {
  value0: Array<Contract__fetchPageOrdersResultValuesStruct>;
  value1: BigInt;

  constructor(
    value0: Array<Contract__fetchPageOrdersResultValuesStruct>,
    value1: BigInt
  ) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromTupleArray(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    return map;
  }

  getValues(): Array<Contract__fetchPageOrdersResultValuesStruct> {
    return this.value0;
  }

  getNewCursor(): BigInt {
    return this.value1;
  }
}

export class Contract extends ethereum.SmartContract {
  static bind(address: Address): Contract {
    return new Contract("Contract", address);
  }

  CONTROLLER_ROLE(): Bytes {
    let result = super.call(
      "CONTROLLER_ROLE",
      "CONTROLLER_ROLE():(bytes32)",
      []
    );

    return result[0].toBytes();
  }

  try_CONTROLLER_ROLE(): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "CONTROLLER_ROLE",
      "CONTROLLER_ROLE():(bytes32)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  DEFAULT_ADMIN_ROLE(): Bytes {
    let result = super.call(
      "DEFAULT_ADMIN_ROLE",
      "DEFAULT_ADMIN_ROLE():(bytes32)",
      []
    );

    return result[0].toBytes();
  }

  try_DEFAULT_ADMIN_ROLE(): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "DEFAULT_ADMIN_ROLE",
      "DEFAULT_ADMIN_ROLE():(bytes32)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  WETH(): Address {
    let result = super.call("WETH", "WETH():(address)", []);

    return result[0].toAddress();
  }

  try_WETH(): ethereum.CallResult<Address> {
    let result = super.tryCall("WETH", "WETH():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  allOrders(param0: BigInt): Contract__allOrdersResult {
    let result = super.call(
      "allOrders",
      "allOrders(uint256):(uint8,uint8,uint8,address,address,address,address,address,address,uint256,uint128,uint128,uint128)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );

    return new Contract__allOrdersResult(
      result[0].toI32(),
      result[1].toI32(),
      result[2].toI32(),
      result[3].toAddress(),
      result[4].toAddress(),
      result[5].toAddress(),
      result[6].toAddress(),
      result[7].toAddress(),
      result[8].toAddress(),
      result[9].toBigInt(),
      result[10].toBigInt(),
      result[11].toBigInt(),
      result[12].toBigInt()
    );
  }

  try_allOrders(
    param0: BigInt
  ): ethereum.CallResult<Contract__allOrdersResult> {
    let result = super.tryCall(
      "allOrders",
      "allOrders(uint256):(uint8,uint8,uint8,address,address,address,address,address,address,uint256,uint128,uint128,uint128)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new Contract__allOrdersResult(
        value[0].toI32(),
        value[1].toI32(),
        value[2].toI32(),
        value[3].toAddress(),
        value[4].toAddress(),
        value[5].toAddress(),
        value[6].toAddress(),
        value[7].toAddress(),
        value[8].toAddress(),
        value[9].toBigInt(),
        value[10].toBigInt(),
        value[11].toBigInt(),
        value[12].toBigInt()
      )
    );
  }

  authorizedFactories(param0: Address): boolean {
    let result = super.call(
      "authorizedFactories",
      "authorizedFactories(address):(bool)",
      [ethereum.Value.fromAddress(param0)]
    );

    return result[0].toBoolean();
  }

  try_authorizedFactories(param0: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "authorizedFactories",
      "authorizedFactories(address):(bool)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  canExecuteOrder(index: BigInt): boolean {
    let result = super.call(
      "canExecuteOrder",
      "canExecuteOrder(uint256):(bool)",
      [ethereum.Value.fromUnsignedBigInt(index)]
    );

    return result[0].toBoolean();
  }

  try_canExecuteOrder(index: BigInt): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "canExecuteOrder",
      "canExecuteOrder(uint256):(bool)",
      [ethereum.Value.fromUnsignedBigInt(index)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  countOrders(): BigInt {
    let result = super.call("countOrders", "countOrders():(uint256)", []);

    return result[0].toBigInt();
  }

  try_countOrders(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("countOrders", "countOrders():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  decimalsUsd(): i32 {
    let result = super.call("decimalsUsd", "decimalsUsd():(uint8)", []);

    return result[0].toI32();
  }

  try_decimalsUsd(): ethereum.CallResult<i32> {
    let result = super.tryCall("decimalsUsd", "decimalsUsd():(uint8)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toI32());
  }

  executeOrders(orderIndexes: Array<BigInt>): Array<boolean> {
    let result = super.call(
      "executeOrders",
      "executeOrders(uint256[]):(bool[])",
      [ethereum.Value.fromUnsignedBigIntArray(orderIndexes)]
    );

    return result[0].toBooleanArray();
  }

  try_executeOrders(
    orderIndexes: Array<BigInt>
  ): ethereum.CallResult<Array<boolean>> {
    let result = super.tryCall(
      "executeOrders",
      "executeOrders(uint256[]):(bool[])",
      [ethereum.Value.fromUnsignedBigIntArray(orderIndexes)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBooleanArray());
  }

  fetchPageOrders(
    cursor: BigInt,
    howMany: BigInt
  ): Contract__fetchPageOrdersResult {
    let result = super.call(
      "fetchPageOrders",
      "fetchPageOrders(uint256,uint256):((uint8,uint8,uint8,address,address,address,address,address,address,uint256,uint128,uint128,uint128)[],uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(cursor),
        ethereum.Value.fromUnsignedBigInt(howMany)
      ]
    );

    return new Contract__fetchPageOrdersResult(
      result[0].toTupleArray<Contract__fetchPageOrdersResultValuesStruct>(),
      result[1].toBigInt()
    );
  }

  try_fetchPageOrders(
    cursor: BigInt,
    howMany: BigInt
  ): ethereum.CallResult<Contract__fetchPageOrdersResult> {
    let result = super.tryCall(
      "fetchPageOrders",
      "fetchPageOrders(uint256,uint256):((uint8,uint8,uint8,address,address,address,address,address,address,uint256,uint128,uint128,uint128)[],uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(cursor),
        ethereum.Value.fromUnsignedBigInt(howMany)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new Contract__fetchPageOrdersResult(
        value[0].toTupleArray<Contract__fetchPageOrdersResultValuesStruct>(),
        value[1].toBigInt()
      )
    );
  }

  getExecutableOrders(orderIndexes: Array<BigInt>): Array<boolean> {
    let result = super.call(
      "getExecutableOrders",
      "getExecutableOrders(uint256[]):(bool[])",
      [ethereum.Value.fromUnsignedBigIntArray(orderIndexes)]
    );

    return result[0].toBooleanArray();
  }

  try_getExecutableOrders(
    orderIndexes: Array<BigInt>
  ): ethereum.CallResult<Array<boolean>> {
    let result = super.tryCall(
      "getExecutableOrders",
      "getExecutableOrders(uint256[]):(bool[])",
      [ethereum.Value.fromUnsignedBigIntArray(orderIndexes)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBooleanArray());
  }

  getRoleAdmin(role: Bytes): Bytes {
    let result = super.call("getRoleAdmin", "getRoleAdmin(bytes32):(bytes32)", [
      ethereum.Value.fromFixedBytes(role)
    ]);

    return result[0].toBytes();
  }

  try_getRoleAdmin(role: Bytes): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "getRoleAdmin",
      "getRoleAdmin(bytes32):(bytes32)",
      [ethereum.Value.fromFixedBytes(role)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  hasRole(role: Bytes, account: Address): boolean {
    let result = super.call("hasRole", "hasRole(bytes32,address):(bool)", [
      ethereum.Value.fromFixedBytes(role),
      ethereum.Value.fromAddress(account)
    ]);

    return result[0].toBoolean();
  }

  try_hasRole(role: Bytes, account: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall("hasRole", "hasRole(bytes32,address):(bool)", [
      ethereum.Value.fromFixedBytes(role),
      ethereum.Value.fromAddress(account)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  nonFungiblePositionManagers(param0: Address): Address {
    let result = super.call(
      "nonFungiblePositionManagers",
      "nonFungiblePositionManagers(address):(address)",
      [ethereum.Value.fromAddress(param0)]
    );

    return result[0].toAddress();
  }

  try_nonFungiblePositionManagers(
    param0: Address
  ): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "nonFungiblePositionManagers",
      "nonFungiblePositionManagers(address):(address)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  onERC721Received(
    param0: Address,
    param1: Address,
    param2: BigInt,
    param3: Bytes
  ): Bytes {
    let result = super.call(
      "onERC721Received",
      "onERC721Received(address,address,uint256,bytes):(bytes4)",
      [
        ethereum.Value.fromAddress(param0),
        ethereum.Value.fromAddress(param1),
        ethereum.Value.fromUnsignedBigInt(param2),
        ethereum.Value.fromBytes(param3)
      ]
    );

    return result[0].toBytes();
  }

  try_onERC721Received(
    param0: Address,
    param1: Address,
    param2: BigInt,
    param3: Bytes
  ): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "onERC721Received",
      "onERC721Received(address,address,uint256,bytes):(bytes4)",
      [
        ethereum.Value.fromAddress(param0),
        ethereum.Value.fromAddress(param1),
        ethereum.Value.fromUnsignedBigInt(param2),
        ethereum.Value.fromBytes(param3)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  priceOracle(): Address {
    let result = super.call("priceOracle", "priceOracle():(address)", []);

    return result[0].toAddress();
  }

  try_priceOracle(): ethereum.CallResult<Address> {
    let result = super.tryCall("priceOracle", "priceOracle():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  supportsInterface(interfaceId: Bytes): boolean {
    let result = super.call(
      "supportsInterface",
      "supportsInterface(bytes4):(bool)",
      [ethereum.Value.fromFixedBytes(interfaceId)]
    );

    return result[0].toBoolean();
  }

  try_supportsInterface(interfaceId: Bytes): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "supportsInterface",
      "supportsInterface(bytes4):(bool)",
      [ethereum.Value.fromFixedBytes(interfaceId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }
}

export class AddOrderV2Call extends ethereum.Call {
  get inputs(): AddOrderV2Call__Inputs {
    return new AddOrderV2Call__Inputs(this);
  }

  get outputs(): AddOrderV2Call__Outputs {
    return new AddOrderV2Call__Outputs(this);
  }
}

export class AddOrderV2Call__Inputs {
  _call: AddOrderV2Call;

  constructor(call: AddOrderV2Call) {
    this._call = call;
  }

  get orderRole(): i32 {
    return this._call.inputValues[0].value.toI32();
  }

  get receiver(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get factory(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get token0(): Address {
    return this._call.inputValues[3].value.toAddress();
  }

  get token1(): Address {
    return this._call.inputValues[4].value.toAddress();
  }

  get amountLiquidity(): BigInt {
    return this._call.inputValues[5].value.toBigInt();
  }

  get minAmountToken0Usd(): BigInt {
    return this._call.inputValues[6].value.toBigInt();
  }

  get minAmountToken1Usd(): BigInt {
    return this._call.inputValues[7].value.toBigInt();
  }
}

export class AddOrderV2Call__Outputs {
  _call: AddOrderV2Call;

  constructor(call: AddOrderV2Call) {
    this._call = call;
  }
}

export class AddOrderV3Call extends ethereum.Call {
  get inputs(): AddOrderV3Call__Inputs {
    return new AddOrderV3Call__Inputs(this);
  }

  get outputs(): AddOrderV3Call__Outputs {
    return new AddOrderV3Call__Outputs(this);
  }
}

export class AddOrderV3Call__Inputs {
  _call: AddOrderV3Call;

  constructor(call: AddOrderV3Call) {
    this._call = call;
  }

  get orderRole(): i32 {
    return this._call.inputValues[0].value.toI32();
  }

  get receiver(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get factory(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }

  get amountLiquidity(): BigInt {
    return this._call.inputValues[4].value.toBigInt();
  }

  get minAmountToken0Usd(): BigInt {
    return this._call.inputValues[5].value.toBigInt();
  }

  get minAmountToken1Usd(): BigInt {
    return this._call.inputValues[6].value.toBigInt();
  }
}

export class AddOrderV3Call__Outputs {
  _call: AddOrderV3Call;

  constructor(call: AddOrderV3Call) {
    this._call = call;
  }
}

export class CancelOrderCall extends ethereum.Call {
  get inputs(): CancelOrderCall__Inputs {
    return new CancelOrderCall__Inputs(this);
  }

  get outputs(): CancelOrderCall__Outputs {
    return new CancelOrderCall__Outputs(this);
  }
}

export class CancelOrderCall__Inputs {
  _call: CancelOrderCall;

  constructor(call: CancelOrderCall) {
    this._call = call;
  }

  get index(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class CancelOrderCall__Outputs {
  _call: CancelOrderCall;

  constructor(call: CancelOrderCall) {
    this._call = call;
  }
}

export class ExecuteOrdersCall extends ethereum.Call {
  get inputs(): ExecuteOrdersCall__Inputs {
    return new ExecuteOrdersCall__Inputs(this);
  }

  get outputs(): ExecuteOrdersCall__Outputs {
    return new ExecuteOrdersCall__Outputs(this);
  }
}

export class ExecuteOrdersCall__Inputs {
  _call: ExecuteOrdersCall;

  constructor(call: ExecuteOrdersCall) {
    this._call = call;
  }

  get orderIndexes(): Array<BigInt> {
    return this._call.inputValues[0].value.toBigIntArray();
  }
}

export class ExecuteOrdersCall__Outputs {
  _call: ExecuteOrdersCall;

  constructor(call: ExecuteOrdersCall) {
    this._call = call;
  }

  get executed(): Array<boolean> {
    return this._call.outputValues[0].value.toBooleanArray();
  }
}

export class GrantRoleCall extends ethereum.Call {
  get inputs(): GrantRoleCall__Inputs {
    return new GrantRoleCall__Inputs(this);
  }

  get outputs(): GrantRoleCall__Outputs {
    return new GrantRoleCall__Outputs(this);
  }
}

export class GrantRoleCall__Inputs {
  _call: GrantRoleCall;

  constructor(call: GrantRoleCall) {
    this._call = call;
  }

  get role(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get account(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class GrantRoleCall__Outputs {
  _call: GrantRoleCall;

  constructor(call: GrantRoleCall) {
    this._call = call;
  }
}

export class InitializeCall extends ethereum.Call {
  get inputs(): InitializeCall__Inputs {
    return new InitializeCall__Inputs(this);
  }

  get outputs(): InitializeCall__Outputs {
    return new InitializeCall__Outputs(this);
  }
}

export class InitializeCall__Inputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }

  get _priceOracle(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _WETH(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class InitializeCall__Outputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }
}

export class RemoveNonfungiblePositionManagerCall extends ethereum.Call {
  get inputs(): RemoveNonfungiblePositionManagerCall__Inputs {
    return new RemoveNonfungiblePositionManagerCall__Inputs(this);
  }

  get outputs(): RemoveNonfungiblePositionManagerCall__Outputs {
    return new RemoveNonfungiblePositionManagerCall__Outputs(this);
  }
}

export class RemoveNonfungiblePositionManagerCall__Inputs {
  _call: RemoveNonfungiblePositionManagerCall;

  constructor(call: RemoveNonfungiblePositionManagerCall) {
    this._call = call;
  }

  get factory(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class RemoveNonfungiblePositionManagerCall__Outputs {
  _call: RemoveNonfungiblePositionManagerCall;

  constructor(call: RemoveNonfungiblePositionManagerCall) {
    this._call = call;
  }
}

export class RenounceRoleCall extends ethereum.Call {
  get inputs(): RenounceRoleCall__Inputs {
    return new RenounceRoleCall__Inputs(this);
  }

  get outputs(): RenounceRoleCall__Outputs {
    return new RenounceRoleCall__Outputs(this);
  }
}

export class RenounceRoleCall__Inputs {
  _call: RenounceRoleCall;

  constructor(call: RenounceRoleCall) {
    this._call = call;
  }

  get role(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get callerConfirmation(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class RenounceRoleCall__Outputs {
  _call: RenounceRoleCall;

  constructor(call: RenounceRoleCall) {
    this._call = call;
  }
}

export class RevokeRoleCall extends ethereum.Call {
  get inputs(): RevokeRoleCall__Inputs {
    return new RevokeRoleCall__Inputs(this);
  }

  get outputs(): RevokeRoleCall__Outputs {
    return new RevokeRoleCall__Outputs(this);
  }
}

export class RevokeRoleCall__Inputs {
  _call: RevokeRoleCall;

  constructor(call: RevokeRoleCall) {
    this._call = call;
  }

  get role(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get account(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class RevokeRoleCall__Outputs {
  _call: RevokeRoleCall;

  constructor(call: RevokeRoleCall) {
    this._call = call;
  }
}

export class SetFactoryCall extends ethereum.Call {
  get inputs(): SetFactoryCall__Inputs {
    return new SetFactoryCall__Inputs(this);
  }

  get outputs(): SetFactoryCall__Outputs {
    return new SetFactoryCall__Outputs(this);
  }
}

export class SetFactoryCall__Inputs {
  _call: SetFactoryCall;

  constructor(call: SetFactoryCall) {
    this._call = call;
  }

  get factory(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get authorized(): boolean {
    return this._call.inputValues[1].value.toBoolean();
  }
}

export class SetFactoryCall__Outputs {
  _call: SetFactoryCall;

  constructor(call: SetFactoryCall) {
    this._call = call;
  }
}

export class SetNonfungiblePositionManagerCall extends ethereum.Call {
  get inputs(): SetNonfungiblePositionManagerCall__Inputs {
    return new SetNonfungiblePositionManagerCall__Inputs(this);
  }

  get outputs(): SetNonfungiblePositionManagerCall__Outputs {
    return new SetNonfungiblePositionManagerCall__Outputs(this);
  }
}

export class SetNonfungiblePositionManagerCall__Inputs {
  _call: SetNonfungiblePositionManagerCall;

  constructor(call: SetNonfungiblePositionManagerCall) {
    this._call = call;
  }

  get factory(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get nonfungiblePositionManager(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class SetNonfungiblePositionManagerCall__Outputs {
  _call: SetNonfungiblePositionManagerCall;

  constructor(call: SetNonfungiblePositionManagerCall) {
    this._call = call;
  }
}

export class UpdatePriceOracleCall extends ethereum.Call {
  get inputs(): UpdatePriceOracleCall__Inputs {
    return new UpdatePriceOracleCall__Inputs(this);
  }

  get outputs(): UpdatePriceOracleCall__Outputs {
    return new UpdatePriceOracleCall__Outputs(this);
  }
}

export class UpdatePriceOracleCall__Inputs {
  _call: UpdatePriceOracleCall;

  constructor(call: UpdatePriceOracleCall) {
    this._call = call;
  }

  get _priceOracle(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class UpdatePriceOracleCall__Outputs {
  _call: UpdatePriceOracleCall;

  constructor(call: UpdatePriceOracleCall) {
    this._call = call;
  }
}