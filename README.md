# MERN EWPShop eCommerce pen website

# EWPShop Layout components and pages first commit

1. Create React App
2. Add Bootstrap and all css
3. Header & Bottom Header, Footer & Bottom Footer
4. A few pages (HomeScreen, AboutScreen, JigScreen)
5. Create Git Repository

# Second Commit

1. Add ProductScreen and Data.js for static data

# Third Commit create backend

1. create route for api/products
2. update and fetch products from backend using axios
3. get state from useReducer
4. update HomeScreen.js

# Fourth Commit by Reducer Hook

1. define reducer
2. update fetch data, get state from useReducer in HomeScreen
3. create product and rating components
4. Use rating in product component
5. Add Helmet to pages and index.js
6. Jumbotron with typewriter effect in HomeScreen and components add Jumbotron.js
7. Create ProductScreen details
8. Create loading component
9. Create message component
10. Add React spinner
11. utils.js to define error function
12. update server.js in backend

# Fifth Commit

1. Add \_id number to products array in data.js
2. Create CartScreen
3. add app.get to server.js to fetch products by \_id

# Sixth Commit SigninScreen

1. Create SigninScreen
2. Connect to MongoDB
3. Add .env to (backend)
4. Update and install all dependencies in {}package.json needed
5. Signin to API
6. Comment out \_id's in data.js (backend)
7. Add models folder > backend/models/productModel.js
8. Add routes folder > backend/routes/productRoutes.js
9. backend/routes/seedRoutes.js
10. backend/routes/userRoutes.js
11. backend/models/productModel.js
12. backend/models/userModel.js
13. backend/utils.js(root)
14. update server.js
15. add SigninScreen to App.js
16. update Header.js for signin link

# Seventh Commit-Checkout

1. Create ShippingScreen and components/CheckoutSteps.js
2. Create SignUpScreen and update backend/routes/userRoutes.js
3. Create PaymentMethodScreen
4. Create PlaceOrderScreen
5. implement Place Order Action
6. Create OrderScreen
7. Pay Order By PayPal

# Eight Commit-Order History

1. Create OrderScreen, and (order history api backend)
2. Create OrderHistoryScreen
3. Create ShippingAddressScreen
4. Create ProfileScreen
5. Create SideBar for categories (optional)
6. Create Categories for categories (optional)
7. Create Bottom header for categories
8. Create SearchScreen (optional)
   components/Header.js without searchBar or sideBar
   components/Header1.js with searchBar and sideBar (optional)

# Ninth Commit-Admin

1. Create Admin component and Header.js
2. Create DashboardScreen.js
3. Manage Products
4. Create Products and ProductEditScreen
5. Update Product and image
6. Delete Product
7. List Order
8. Deliver Order
9. Delete Order
10. List User
11. Edit and Delete User

# Tenth Commit-Advanced Features

1. Google Map (option)
2. Send email order receipt
3. Create ContactPage
4. Rate and review products
5. Upload multiple images ProductScreen
6. react-image-magnify on ProductScreen
7. Pagination on HomeScreen

# Eleventh Commit-Remove ContactScreen and MapScreen

1. Remove ContactScreen and MapScreen from App.js and screens
2. use gmail option in Footer.js

# Twelfth Commit-Revert

1. Finalize design features
2. React Tables now responsive
3. Add font-awesome icons

# Thirteenth Commit-.env.example

1. rename .env.example to .env and add fields to connect backend to frontend
2. npm install frontend, npm start.
3. npm install backend, npm start.

# Fourteenth Commit-deploy

1. frontend - npm run build for deployment

# Fifteenth Commit-remove build

# Sixteenth Commit-footer href links

1. fix href links in Footer.js and BottomFooter.js to open in new window tab.
2. fixing these will keep viewers on your main page.

# Seventeenth Commit-css modifications

1. fix css for thumbnail images (responsive for mobile) media queries.
2. fix css for tablet jumbotron lathe turning image media queries.

# Eighteenth Commit-add toast notification for add to cart

1. Add toast notification to components > Product.js (Line 29-32)
   app.js (Lines 29-30, 37)

# Twentieth Commit-npm run build

1. cd frontend npm run build

# Twenty First Commit-Reset password added

1. FRONTEND
   folder > screens
   ForgetPasswordScreen.js added
   ResetPasswordScreen.js added
2. App.js modified (Lines 31-32, 50-53)
3. frontend {} package.json changed port from 8000 to 4000
4. BACKEND
   modified models > userModel.js (Line 8) added
5. modified routes > userRoutes (Lines 99-121) added
6. .ENV.EXAMPLE modified added (Line 1)
7. modified config.js (Lines 6-7)

# Twenty Second Commit-Add ContactScreen Components

1. FRONTEND
   folder > screens
   ContactScreen.js added
   MessagesScreen.js added
2. folder > components
   Header.js > add messages to '/admin/messages' (Lines 113-115)
   Footer.js > uncomment (Lines 80-83) for '/contact'
3. BACKEND
   folder > models
   messageModel.js added
4. folder > routes
   messageRoutes.js added
5. server.js
   app.use(messageRouter); (Line 37)
6. You can add contact info to page and check your database for messages, also as admin you can check admin dropdown and review message.

# Twenty Third Commit-Add Date and Delete to MessageScreen

1. BACKEND
   folder > models
   messageModel.js added: update_time: (Line 5)
2. folder > routes
   messageRoutes.js added: delete a message (Lines 30-50)

3. FRONTEND
   folder > screens
   MessagesScreens.js:
   .actions
   .update_time
   .loadingBox
   .messageBox
   .deleteHandler
   .Pagination (Lines 113-117) & (Lines 172-192)

# Twenty Fourth Commit-Add image to OrderListScreen.js / Add Stripe / switch from mg to nodemon

1. FRONTEND
   folder > screens
   OrderListScreen.js (Lines 118-162 modified)

2. BACKEND
   config.js (Lines 12-13) added NODE_USER & NODE_PASSWORD
3. .env.example (Lines 14-15) added NODE_USER= & NODE_PASSWORD
   add (Lines in config.js 15-16)
4. make the same chances to .env
5. utils.js (Lines 44-54) changes made
6. folder > routes
   orderRoutes.js (Line 146) change mailgun to nodemailerFunction

7. FRONTEND
   folder > screens
   ProductMagScreen.js (Lines 258-264) added low quantity alert

8. FRONTEND
   added pagination => admin screens
   a. UserListScreen.js (Lines 4, 45, 95-99, 156-173)
   b. ProductListScreen.js (Lines 5, 137-141, 213-228)
   c. OrderListScreen.js (Line 4, 105-109, 188-205)

9. BACKEND
   npm i stripe
   folder > routes : stripeRouter.js
   server.js (Lines 6, 37)
   add .env.example (Lines 5-6)
   add config.js (Lines 10-12)

10. FRONTEND
    Add Stripe to OrderScreen.js
    npm i @stripe/react-stripe-js @stripe/stripe-js
    folder > components : StripeCheckout.js
    folder > screens
    OrderScreen.js (Lines 13-14, 56-57, 94-114, 134-135, 147-200, 228, 340-362)

## Twenty Fifth Commit-Add Lightbox/Carousel to ProductMagScreen

1. FRONTEND
   npm i react-responsive-carousel react-responsive react-image-lightbox
   folder > screens
   ProductMagScreen.js
   (modified thumbnail images for left side)
   (ProductMagScreenRow has previous code for thumbnail images under main image as option)
   .added mobile view with Carousel
   .added Lightbox when clicking on image-magnify

## Twenty Sixth Commit-Add Skeleton and replace LoadingBox component

1. FRONTEND
   npm i react-loading-skeleton
   css > add css marked for Skeleton.css

   folder > components:
   Skeleton.js
   SkeletonDashboardScreen.js
   SkeletonHomeScreen.js
   SkeletonMessageScreen.js
   SkeletonOrderHistoryScreen.js
   SkeletonOrderListScreen.js.js
   SkeletonProductListScreen.js
   SkeletonProductMagScreen.js
   SkeletonUseEditScreen.js
   SkeletonUserListScreen.js

   folder > screens:
   DashboardScreen.js (Lines 8, 37-39, 60)
   HomeScreen.js (Lines 12, 49-50, 114-122)
   MessagesScreen.js (Lines 9, 71-73, 130-138)
   OrderHistoryScreen.js (Lines 3, 9, 36-38, 74-80)
   OrderListScreen.js (Lines 3, 11, 57-59, 122-130)
   ProductListScreen.js (Lines 10, 81-83, 160-170)
   ProductMagScreen.js (Lines 26, 71-73, 173)
   UserEditScreen.js (Lines 10, 50-52, 101, 137)
   UserListScreen.js (Lines 3, 11, 57-59, 112-120)
