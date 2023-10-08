## Tasks :

- Add gitHooks for master check and makefile to create Branches with same naming convention. (Done)
- Initialize with MongoDb to store the userData.
  - email, password, isAdmin, isVerifiedUser, totalNumberOfOrders, coupons, totalItemsPurchased, totalAmountSpent, totalAmountSaved, isCouponValid, cartItems(key value) (Done)
- Create basic user login, signup, logout.(UI) (Done)
- Create basic user login, signup, logout.(BE) (Done)
- Add a static file to list all the items (instead of DB). (Done)
- Create Endpoints for adding items to cart, checkout api which validates the coupon. (Done)
- Generate coupon if client has nth order. (Done)
- FrontEnd (if time is left) (Done)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Developer Pre-Requisite

```bash
# from your root folder run the following to enable githooks
chmod +x githooks/pre-commit
ln -s -f ../../githooks/pre-commit .git/hooks/

# To Create a new Branch please use the following to keep it clean
make branch name=NameOfTheBranch
```

## TEST Endpoints

```bash
# create a user
curl --location 'http://localhost:3000/api/users/signup' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "test",
    "email": "test@gmail.com",
    "password": "test"
}'

# Login
curl --location 'http://localhost:3000/api/users/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "test@gmail.com",
    "password": "test"
}'

# Get user details
curl --location 'http://localhost:3000/api/users/me?username=test' \

# Logout
curl --location 'http://localhost:3000/api/users/logout'

# Add Item to Cart
curl --location 'http://localhost:3000/api/store/addcart' \
--header 'Content-Type: application/json' \
--data '{
    "bookID": 23,
    "price": 123,
    "username": "test"
}'

# remove the item from cart
curl --location 'http://localhost:3000/api/store/delcart' \
--header 'Content-Type: application/json' \
--data '{
    "bookID": 23,
    "username": "test"
}'

# proceed to checkout
# Every nth (in our case n=3 so 3rd, 6th, 9th... order will generate a coupon)
curl --location --request GET 'http://localhost:3000/api/store/checkout?username=test' \
--header 'Content-Type: application/json'

# place buy order
curl --location 'http://localhost:3000/api/store/buyorder' \
--header 'Content-Type: application/json' \
--data '{
    "coupon": "",
    "username": "test"
}'

```
