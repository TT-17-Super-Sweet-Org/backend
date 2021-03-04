# API Documentation

## 1️⃣ Getting Started

### API Base URL 
`https://tt17-secret-family-recipe.herokuapp.com/api`

### To confirm the API is online:
Send a GET request to the base URL. No headers or body is required for this test. Success will return status code 200 and message. Failure will return error.

## 2️⃣ Endpoints Overview

### All Endpoints
| Request | URL | Description | Requires Auth Token |
|----------|----------|----------|----------|
|POST | /auth/register | registers a new user | N |
|POST | /auth/login | login an existing user | N |
|POST | /recipes| saves a new recipe to db | Y |
|GET | /recipes/:username | returns all recipes for that user | Y |
|GET | /recipes/:username/:id | returns recipe for that user at specified recipe_id | Y |
|PUT | /recipes/:username/:id | updates recipe for that user at specified recipe_id | Y |
|DELETE | /recipes/:username/:id | deletes recipe for that user at specified recipe_id | Y |
|NOTE | | Users should create at least one recipe |Y|
</br>

---
## 3️⃣ Endpoints Details 

### ***POST /auth/register***

*  **Request Body:**
 
   ```
   {
       "username": "coolChef",             #required
       "password": "0n10nsrule",           #required
   }
   ```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    
    ```
    {
        "id": 1,
        "username": "coolChef", 
        "password": (encrypted token)
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:**
    `{ message : "Username taken" }` or `{ message : "Username or password missing" }`

  OR

  * **Code:** 500 SERVER ERROR <br />
    **Content:** `{ message: "(relevant message will be returned)" }`

---

### ***POST /auth/login***

*  **Request Body:**
 
   ```
   {
       "username": "coolChef",             #required
       "password": "0n10nsrule",           #required
   }
   ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    
    ```
    {
        "message": `Welcome to the API, ${username}`,
        "token": (private token)
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "Username or password missing" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "Invalid credentials" }`

  OR

  * **Code:** 500 SERVER ERROR <br />
    **Content:** `{ message: "(relevant message will be returned)" }`
  
---

### ***POST /recipes***

*  **Request Body:**
 
     ```
   {
      "title": "The Best Lasagna",  #required
      "source": "Family Secret",  #required
      "category": "dinner",        #required
      "instructions": "add ground beef, layered with the goodness of sheet lasagna    pasta, and sprinkle mozzamagic", #required
      "ingredients": "1lb of ground beef, sheet lasagna pasta, 3 cups mozzarella" #required
      "username": "coolChef"        #required
   }
   ```
  
* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    
    ```
    {
        "title": "The Best Lasagna",  #required
      "source": "Family Secret",  #required
      "category": "dinner",        #required
      "instructions": "add ground beef, layered with the goodness of sheet lasagna    pasta, and sprinkle mozzamagic", #required
      "ingredients": "1lb of ground beef, sheet lasagna pasta, 3 cups mozzarella" #required
      "username": "coolChef"        #required
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "All fields must be filled out :'(" }`

  OR

  * **Code:** 500 SERVER ERROR <br />
    **Content:** `{ message: "(relevant message will be returned)" }`

---

### ***GET /recipes/:username***

*  **Request Body:**
 
   ```
   no body required. empty body accepted.
   ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    
    ```
    [
    {
     "recipe_id": 1,
      "title": "The Best Lasagna",  #required
      "source": "Family Secret",  #required
      "category": "dinner",        #required
      "instructions": "add ground beef, layered with the goodness of sheet lasagna    pasta, and sprinkle mozzamagic", #required
      "ingredients": "1lb of ground beef, sheet lasagna pasta, 3 cups mozzarella", #required
      "username": "coolChef"        #required
     }
    ]
    ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ message: 'This user has no recipes saved.' }`

  OR

  * **Code:** 500 SERVER ERROR <br />
    **Content:** `{ message: "(relevant message will be returned)" }`
  
---

### ***GET /recipes/:username/:id***

*  **Request Body:**
 
   ```
   no body required. empty body accepted.
   ```

* **Success Response:**

 * **Code:** 200 <br />
    **Content:** 
    
    ```
    [
       {
     "recipe_id": 1,
      "title": "The Best Lasagna",  #required
      "source": "Family Secret",  #required
      "category": "dinner",        #required
      "instructions": "add ground beef, layered with the goodness of sheet lasagna    pasta, and sprinkle mozzamagic", #required
      "ingredients": "1lb of ground beef, sheet lasagna pasta, 3 cups mozzarella", #required
      "username": "coolChef"        #required
     }
    ]
    ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ message: 'Provided recipe_id for this user does not exist.' }`

  OR

  * **Code:** 500 SERVER ERROR <br />
    **Content:** `{ message: "(relevant message will be returned)" }`
  

---

### ***PUT /recipes/:username/:id***

*  **Request Body:**
 
 ```
 [
      {
      "title": "The Best KETO Lasagna",  #optional
      "source": "Family Secret",  #optional
      "category": "dinner",        #optional
      "instructions": "add ground beef, sub sheet lasagna with sliced eggplants, and sprinkle mozzamagic", #optional
      "ingredients": "1lb of ground beef, sliced eggplants, 3 cups mozzarella", #optional
      "username": "coolChef"        #optional
      }   
 ]
 ```

* **Success Response:**

 * **Code:** 200 <br />
    **Content:** 
    
    ```
    [
      {
      "recipe_id": 1,
      "title": "The Best KETO Lasagna", 
      "source": "Family Secret",  
      "category": "dinner",        
      "instructions": "add ground beef, sub sheet lasagna with sliced eggplants, and sprinkle mozzamagic", 
      "ingredients": "1lb of ground beef, sliced eggplants, 3 cups mozzarella", 
      "username": "coolChef"     
      } 
    ]
    ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ message: 'Provided recipe_id for this user does not exist.' }`

  OR
  
   * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "All fields must be filled out :'(" }`

  OR

  * **Code:** 500 SERVER ERROR <br />
    **Content:** `{ message: "(relevant message will be returned)" }`
  
---
### ***DELETE /recipes/:username/:id***

*  **Request Body:**
 
 ```
   no body required. empty body accepted.
 ```

* **Success Response:**

 * **Code:** 200 <br />
    **Content:** 
    
    ```
      {
        "message": "recipe deleted"     
      } 
    ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ message: 'Provided recipe_id for this user does not exist.' }`

  OR

  * **Code:** 500 SERVER ERROR <br />
    **Content:** `{ message: "(relevant message will be returned)" }`
  
---
