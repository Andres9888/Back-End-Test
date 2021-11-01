# QA has submitted the following tickets

## Filtering Orders
### QA Notes
When getting all orders filtered by a property, the orders are not being filtered at all. I tried filtering the orders by name for any order that was an "Additional Topping" but I'm getting all orders back.

### Tips
For query params you will want to assume `filterProperty` is "name" and `filterValue` is "Additional Topping".

### Dev Notes / Response

Should work for filter by name or other properties like customerName for example

---

I was going to add validation for all the routes but in the interest of time I did not but would have in a real world environment.


## Placing An Order
### QA Notes
When testing an order for a family of 6, the total is not as expected. I placed an order for the following: 

    - 2 Cheeseburgers
    - 2 Pickle Toppings
    - 1 Large Fiesta Salad
    - 3 Avocado Toppings
    - 1 Medium Hawaiian Pizza
    - 3 Medium French Fries
    - 4 Large Fountain Drinks

I calculated that the total should be $74.23 but I'm getting $51.28. Because that's a difference of $22.95, I have a feeling the "Medium Hawaiian Pizza" isn't being added.

### Tips
All items ordered (and more) can be referenced in lib/orders.js

### Dev Notes / Response

Currently it seems like the total function is working properly

---

I checked a few times to make sure I was adding the order prices correctly. The total I had was 63.91 which is different from the 74.23 you wanted to get and 51.28 you would have got if there was a bug.

 
We might have to review this to make sure the items listed are correct. More than likely you want a similar item and got it missed up. For example Cheeseburger with Cheese Pizza or something like this. 

This is the data I used

{
  "customerName": "family of six",
  "items": [
    {
      "id": "91bf040b-dd2c-4bd7-a52a-612be3ed4589",
      "name": "Cheeseburger",
      "size": null,
      "quantity": 2,
      "price": 1090
    },
    {
      "id": "d6f9b082-b959-4067-a481-c42bf808e531",
      "name": "Hawaiian Pizza",
      "size": "medium",
      "quantity": 1,
      "price": 2295
    },
    {
      "id": "c843d936-9772-4391-9055-701a580073d2",
      "name": "Additional Topping - Pickles",
      "size": null,
      "quantity": 2,
      "price": 50
    },
    {
      "id": "e361c0d6-a369-4c2a-b917-f792acf73d11",
      "name": "Fiesta Salad",
      "size": "large",
      "quantity": 1,
      "price": 1550
    },
    {
      "id": "24a8a3e5-ccb7-4f9c-9497-48f924fbf438",
      "name": "Additional Topping - Avocado",
      "size": null,
      "quantity": 3,
      "price": 375
    },
    {
      "id": "23b855da-cbf9-42ec-933f-91db213b1849",
      "name": "French Fries",
      "size": "medium",
      "quantity": 3,
      "price": 433
    },
    {
      "id": "cddbc9c5-748f-476d-83e2-f71f1ac82731",
      "name": "Fountain Drink",
      "size": "large",
      "quantity": 4,
      "price": 598
    }
  ]
}

## Updating An Order
### QA Notes
When getting updating an order I expect to only have to pass what has changed. However, if I don't pass everything (customerName or items), that value gets removed. If for instance I did not change the customer name, I would expect it to use the one originally on the order.

Additionally, when updating the items ordered, the total is not updating.

### Dev Notes / Response

Should be fixed.

---


## Deleting An Order
### QA Notes
When  I delete an order, the order that gets deleted is never the one I expect. I know we recently changed how we are doing our deletes so I'm not sure everything got updated. But when I delete a specific order, that's usually not the one that gets deleted. Unless I delete it immediately.

### Dev Notes / Response

Should be fixed I deleted the actual order but could have just set it to delete = true status to keep the data until we actually want to delete it and not show it. 

---


## Other
