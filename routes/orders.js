const Router = require("koa-router")
const uuid = require("uuid").v4

const ordersRouter = new Router({ prefix: "/orders" })
const ordersData = require("../data/ordersData")

ordersRouter.get("/", async (ctx) => {
  const { filterProperty, filterValue } = ctx.query
  try {
    let results = ordersData

    if (filterProperty && filterValue) {
      if (filterProperty === "name") {
        results = ordersData.filter(({ items }) =>
          items.some(({ name }) => name.includes(filterValue))
        )
      } else {
        results = ordersData.filter(
          (order) => order[filterProperty] === filterValue
        )
      }
    }

    ctx.status = 200
    ctx.body = results
  } catch (error) {
    ctx.status = 500
    ctx.body = error
  }
})

ordersRouter.get("/:id", async (ctx) => {
  const { id } = ctx.params

  try {
    const order = ordersData.find((order) => order.id === id)

    if (!order) {
      ctx.throw(404, "Order not found")
    }

    ctx.status = 200
    ctx.body = order
  } catch (error) {
    ctx.status = 500
    ctx.body = error
  }
})

ordersRouter.post("/", async (ctx) => {
  const { customerName, items } = ctx.request.body

  if (!items.length) {
    ctx.throw(409, "No items ordered")
  }

  try {
    const total = items.reduce(
      (orderTotal, item) => (orderTotal += item.price),
      0
    )

    const order = {
      id: uuid(),
      customerName,
      createdOn: new Date(),
      items,
      total,
    }

    ctx.status = 201
    ctx.body = [...ordersData, order]
  } catch (error) {
    ctx.status = 500
    ctx.body = error
  }
})

ordersRouter.put("/:id", async (ctx) => {
  const { id } = ctx.params
  const { customerName, items } = ctx.request.body

  try {
    let order = ordersData.find((order) => order.id === id)

    if (!order) {
      ctx.throw(404, "Could not find order")
    }
    if (!items && !customerName) {
      ctx.throw(400, "No items ordered or Name to update")
    }
    if (customerName) {
      order["customerName"] = customerName
    }
    if (items) {
      order["items"] = items
      order["price"] = items.reduce(
        (orderTotal, item) => (orderTotal += item.price),
        0
      )
    }

    ctx.status = 200
    ctx.body = { ...order }
  } catch (error) {
    ctx.status = 500
    ctx.body = error
  }
})

ordersRouter.delete("/:id", async (ctx) => {
  const { id } = ctx.params
  try {
    const order = ordersData.find((order) => order.id === id)

    if (!order) {
      ctx.throw(404, "Could not find order")
    }

    ctx.status = 200
    ctx.body = ordersData
  } catch (error) {
    ctx.status = 500
    ctx.body = error
  }
})

module.exports = ordersRouter
