## Tasks :

- Add gitHooks for master check and makefile to create Branches with same naming convention.
- Initialize with MongoDb to store the userData.
  - email, password, isAdmin, isVerifiedUser, totalNumberOfOrders, coupons, totalItemsPurchased, totalAmountSpent, totalAmountSaved, isCouponValid, cartItems(key value)
- Create basic user login, signup, logout.(UI)
- Create basic user login, signup, logout.(BE)
- Add a static file to list all the items (instead of DB).
- Create Endpoints for adding items to cart, checkout api which validates the coupon.
- Generate coupon if client has nth order.
- FrontEnd (if time is left)

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
