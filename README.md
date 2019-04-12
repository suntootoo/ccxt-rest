# CCXT REST

**Open Source Unified REST API of 100+ Crypto Exchange Sites !**

**Wrapped in AWS lambda**

## Table of Contents

- [CCXT REST](#ccxt-rest)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Getting Started](#getting-started)
    - [Installation](#installation)
      - [NPM Package](#npm-package)
      - [Docker](#docker)
  - [TLDR](#tldr)
  - [Common APIs](#common-apis)
    - [Fecthing the markets](#fecthing-the-markets)
    - [Fetching ticker](#fetching-ticker)
    - [Creating an order](#creating-an-order)
    - [Fetch open orders](#fetch-open-orders)
    - [Cancelling an order](#cancelling-an-order)
  - [API](#api)
  - [Feature / Support Request](#feature--support-request)

## Introduction

[CCXT](https://github.com/ccxt/ccxt/) is a popular open source library to connect to over 100 cryptocurrency exchange sites via a unified API. And the APIs are available by importing a nodejs, python or a PHP library. So if you're using any of those 3 programming languages, you'd be able to import and use ccxt. 

However, if you are not using those 3 programming languages, you can use ccxt-rest in order to connect to a ccxt's unified API via REST.

For example, if you want to get the list of support exchanges of ccxt, in nodejs, you would do the following

```javascript
var ccxt = require ('ccxt')

console.log (ccxt.exchanges) // print all available exchanges
```

..and you will get..

```javascript
[ '_1broker',
  '_1btcxe',
  'acx',
  'allcoin',
  ...
]
```

In ccxt-rest, you can do the following:

```bash
$ curl http://localhost:3000/exchanges
```

..and you will get..

```json
[
  "_1broker",
  "_1btcxe",
  "acx",
  ...
]
```

Furthermore, ccxt-rest allows you complete access to the ccxt APIs by exposing all of a ccxt exchange object's method as REST API. 

## Getting Started

### Installation

You can install this as a global node package, or run the server via docker

#### NPM Package

```bash
$ npm install -g ccxt-rest
$ ccxt-rest
```

#### Docker

```bash
$ docker run -p 3000:3000 franzsee/ccxt-rest
```

## TLDR

- List supported exchanges (_all possible values for `{{exchangeName}}`_)
    ```bash
   $ curl http://localhost:3000/exchanges
    ```


- Calling an exchange instance method (_the REST API format for most of the interesting stuff like retreival of trades, order book, your wallet/balances, creating an order, canceling an order, etc_)
    ```bash
    $ curl -X POST http://localhost:3000/exchanges/{{exchangeName}}/{{methodName}}
     --header "appKey":"myAppKey" --header "secret":"myAppSecret"
     -d '["1stParameter", {"2ndParameter":"value"}, "etc"]'
    ```

_Note:_
- [CCXT REST](#ccxt-rest)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Getting Started](#getting-started)
    - [Installation](#installation)
      - [NPM Package](#npm-package)
      - [Docker](#docker)
  - [TLDR](#tldr)
  - [Common APIs](#common-apis)
    - [Fecthing the markets](#fecthing-the-markets)
    - [Fetching ticker](#fetching-ticker)
    - [Creating an order](#creating-an-order)
    - [Fetch open orders](#fetch-open-orders)
    - [Cancelling an order](#cancelling-an-order)
  - [API](#api)
  - [Feature / Support Request](#feature--support-request)


## Common APIs

Once you have an exchange instance, you can then start calling methods of that exchange instance by supplying the following:

- [CCXT REST](#ccxt-rest)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Getting Started](#getting-started)
    - [Installation](#installation)
      - [NPM Package](#npm-package)
      - [Docker](#docker)
  - [TLDR](#tldr)
  - [Common APIs](#common-apis)
    - [Fecthing the markets](#fecthing-the-markets)
    - [Fetching ticker](#fetching-ticker)
    - [Creating an order](#creating-an-order)
    - [Fetch open orders](#fetch-open-orders)
    - [Cancelling an order](#cancelling-an-order)
  - [API](#api)
  - [Feature / Support Request](#feature--support-request)

The format to call any exchange instance method is the following:

```bash
$ curl -X POST http://localhost:3000/exchanges/{{exchangeName}}/{{method}} -d '["1stParameter", {"2ndParameter":"value"}, "etc"]'
```

_Note: The HTTP Method for calling exchange instance method is always **POST**. Also the POST body is always of JSON format. Particularly, it's always an array wherein each entry represents the sequential parameter list of the method you are invoking._

### Fecthing the markets

```bash
$ curl -X POST http://localhost:3000/exchanges/bitso/fetchMarkets
```

### Fetching ticker

```bash
$ curl -X POST http://localhost:3000/exchanges/bitso/fetchTicker -d '["BTC/MXN"]'
```

### Creating an order

```bash
$ curl -X POST http://localhost:3000/exchanges/bitso/createOrder -d '["BTC/MXN", "limit", "buy", 1, 500]'
```

### Fetch open orders

```bash
$ curl -X POST http://localhost:3000/exchanges/bitso/fetchOpenOrders
```

### Cancelling an order

```bash
$ curl -X POST http://localhost:3000/exchanges/bitso/fetchOpenOrders -d '["myOpenOrderId"]'
```

## API

The list of APIs as of this writing are the following

```
                                 User
    +-------------------------------------------------------------+
    |                            CCXT                             |
    +------------------------------+------------------------------+
    |            Public            |           Private            |
    +=============================================================+
    │                              .                              |
    │                    The Unified CCXT API                     |
    │                              .                              |
    |       loadMarkets            .           fetchBalance       |
    |       fetchMarkets           .            createOrder       |
    |       fetchCurrencies        .            cancelOrder       |
    |       fetchTicker            .             fetchOrder       |
    |       fetchTickers           .            fetchOrders       |
    |       fetchOrderBook         .        fetchOpenOrders       |
    |       fetchOHLCV             .      fetchClosedOrders       |
    |       fetchTrades            .          fetchMyTrades       |
    |                              .                deposit       |
    |                              .               withdraw       |
    │                              .                              |
    +=============================================================+
    │                              .                              |
    |                     Custom Exchange API                     |
    |                      (Derived Classes)                      |
    │                              .                              |
    |       publicGet...           .          privateGet...       |
    |       publicPost...          .         privatePost...       |
    |                              .          privatePut...       |
    |                              .       privateDelete...       |
    |                              .                   sign       |
    │                              .                              |
    +=============================================================+
    │                              .                              |
    |                      Base Exchange Class                    |
    │                              .                              |
    +=============================================================+
```

Again, the format to call a ccxt exchange method is the following

```bash
$ curl -X POST http://localhost:3000/exchanges/{{exchangeName}}/{{method}} -d '["1stParameter", {"2ndParameter":"value"}, "etc"]'
```

- [CCXT REST](#ccxt-rest)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Getting Started](#getting-started)
    - [Installation](#installation)
      - [NPM Package](#npm-package)
      - [Docker](#docker)
  - [TLDR](#tldr)
  - [Common APIs](#common-apis)
    - [Fecthing the markets](#fecthing-the-markets)
    - [Fetching ticker](#fetching-ticker)
    - [Creating an order](#creating-an-order)
    - [Fetch open orders](#fetch-open-orders)
    - [Cancelling an order](#cancelling-an-order)
  - [API](#api)
  - [Feature / Support Request](#feature--support-request)

As of this writing, these are the documented methods in CCXT.

- `fetchMarkets ()`: Fetches a list of all available markets from an exchange and returns an array of markets (objects with properties such as `symbol`, `base`, `quote` etc.). Some exchanges do not have means for obtaining a list of markets via their online API. For those, the list of markets is hardcoded. 
   ```bash
   $ curl -X POST http://localhost:3000/exchanges/{{exchangeName}}/fetchMarkets
   ```
- `loadMarkets ([reload])`: Returns the list of markets as an object indexed by symbol and caches it with the exchange instance. Returns cached markets if loaded already, unless the `reload = true` flag is forced.
   ```bash
   $ curl -X POST http://localhost:3000/exchanges/{{exchangeName}}/loadMarkets -d '[reload]'
   ```
- `fetchOrderBook (symbol[, limit = undefined[, params = {}]])`: Fetch L2/L3 order book for a particular market trading symbol.
   ```bash
   $ curl -X POST http://localhost:3000/exchanges/{{exchangeName}}/fetchOrderBook -d '[symbol[, limit = undefined[, params = {}]]]'
   ```
- `fetchL2OrderBook (symbol[, limit = undefined[, params]])`: Level 2 (price-aggregated) order book for a particular symbol.
   ```bash
   $ curl -X POST http://localhost:3000/exchanges/{{exchangeName}}/fetchL2OrderBook -d '[symbol[, limit = undefined[, params]]]'
   ```
- `fetchTrades (symbol[, since[, [limit, [params]]]])`: Fetch recent trades for a particular trading symbol.
   ```bash
   $ curl -X POST http://localhost:3000/exchanges/{{exchangeName}}/fetchTrades -d '[symbol[, since[, [limit, [params]]]]]'
   ```
- `fetchTicker (symbol)`: Fetch latest ticker data by trading symbol.
   ```bash
   $ curl -X POST http://localhost:3000/exchanges/{{exchangeName}}/fetchTicker -d '[symbol]'
   ```
- `fetchBalance ()`: Fetch Balance.
   ```bash
   $ curl -X POST http://localhost:3000/exchanges/{{exchangeName}}/fetchBalance
   ```
- `createOrder (symbol, type, side, amount[, price[, params]])`
   ```bash
   $ curl -X POST http://localhost:3000/exchanges/{{exchangeName}}/createOrder -d '[symbol, type, side, amount[, price[, params]]]'
   ```
- `createLimitBuyOrder (symbol, amount, price[, params])`
   ```bash
   $ curl -X POST http://localhost:3000/exchanges/{{exchangeName}}/createLimitBuyOrder -d '[symbol, amount, price[, params]]'
   ```
- `createLimitSellOrder (symbol, amount, price[, params])`
   ```bash
   $ curl -X POST http://localhost:3000/exchanges/{{exchangeName}}/createLimitSellOrder -d '[symbol, amount, price[, params]]'
   ```
- `createMarketBuyOrder (symbol, amount[, params])`
   ```bash
   $ curl -X POST http://localhost:3000/exchanges/{{exchangeName}}/createMarketBuyOrder -d '[symbol, amount[, params]]'
   ```
- `createMarketSellOrder (symbol, amount[, params])`
   ```bash
   $ curl -X POST http://localhost:3000/exchanges/{{exchangeName}}/createMarketSellOrder -d '[symbol, amount[, params]]'
   ```
- `cancelOrder (id[, symbol[, params]])`
   ```bash
   $ curl -X POST http://localhost:3000/exchanges/{{exchangeName}}/cancelOrder -d '[id[, symbol[, params]]]'
   ```
- `fetchOrder (id[, symbol[, params]])`
   ```bash
   $ curl -X POST http://localhost:3000/exchanges/{{exchangeName}}/fetchOrder -d '[id[, symbol[, params]]]'
   ```
- `fetchOrders ([symbol[, since[, limit[, params]]]])`
   ```bash
   $ curl -X POST http://localhost:3000/exchanges/{{exchangeName}}/fetchOrders -d '[[symbol[, since[, limit[, params]]]]]'
   ```
- `fetchOpenOrders ([symbol[, since, limit, params]]]])`
   ```bash
   $ curl -X POST http://localhost:3000/exchanges/{{exchangeName}}/fetchOpenOrders -d '[[symbol[, since, limit, params]]]]]'
   ```
- `fetchClosedOrders ([symbol[, since[, limit[, params]]]])`
   ```bash
   $ curl -X POST http://localhost:3000/exchanges/{{exchangeName}}/fetchClosedOrders -d '[[symbol[, since[, limit[, params]]]]]'
   ```
- `fetchMyTrades ([symbol[, since[, limit[, params]]]])`
   ```bash
   $ curl -X POST http://localhost:3000/exchanges/{{exchangeName}}/fetchMyTrades -d '[[symbol[, since[, limit[, params]]]]]'
   ```

***************************************************************

**For more information, kindly see the [CCXT Manual](https://github.com/ccxt/ccxt/wiki/Manual)**

***************************************************************
