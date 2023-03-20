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
