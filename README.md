# API Documentation

## 1️⃣ Getting Started

### API Base URL 
`https://supersweetorg.herokuapp.com/api`

### To confirm the API is online...
Send a GET request to the base URL. No headers or body is required for this test. 
Success will return status code 200. Failure will return error.  

---
## 2️⃣ Endpoints Overview

### All Endpoints
| Request | URL | Description | Requires Auth Token |
|----------|----------|----------|----------|
|POST | /auth/register | registers a new user | N |
|POST | /auth/login | login an existing user | N |
|GET | /recipes | returns recipes for that user_id | Y |
|POST | /recipes| saves a new recipe to db | Y |
|GET | /recipes/:id | returns recipe for that recipe_id | Y |
|PUT | /recipes/:id | updates recipe for that recipe_id | Y |
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
        "user_id": 1,
        "username": "coolChef",
        "created_at": "2021-03-01 19:56:28",
        "updated_at": "2021-03-01 19:56:28"
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "Required field(s) username or password is incomplete" }`

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
        "message": `Welcome to the API, ${username}`
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "Required field(s) is missing" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "Invalid credentials." }`

  OR

  * **Code:** 500 SERVER ERROR <br />
    **Content:** `{ message: "(relevant message will be returned)" }`
  
---

### ***GET /recipes***

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
          "user_id": 1,
          "title": "Example Title",
          "source": "Example Source",
          "category_id": 1
      },
      {
          "recipe_id": 2,
          "user_id": 1,
          "title": "Another Title",
          "source": "Another Source",
          "category_id": 2
      },
    ]
    ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ message: 'This user has no recipes saved.' }`

  OR

  * **Code:** 500 SERVER ERROR <br />
    **Content:** `{ message: "(relevant message will be returned)" }`
  
---

### ***GET /recipes/:id***

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
          "user_id": 1,
          "title": Example Title,
          "source": "Example Source",
          "category_id": 1
      }
    ]
    ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ message: 'Provided recipe_id does not exist.' }`

  OR

  * **Code:** 500 SERVER ERROR <br />
    **Content:** `{ message: "(relevant message will be returned)" }`
  

---

### ***PUT /recipes/:id***

*  **Request Body:**
 
 ```
      {
          "title": Update Title,
          "source": "Update Source",
          "category_id": 3
      }   
 ```

* **Success Response:**

 * **Code:** 200 <br />
    **Content:** 
    
    ```
    [
      {
          "recipe_id": 1,
          "user_id": 1,
          "title": Update Title,
          "source": "Update Source",
          "category_id": 3
      }
    ]
    ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ message: 'Provided recipe_id does not exist.' }`

  OR

  * **Code:** 500 SERVER ERROR <br />
    **Content:** `{ message: "(relevant message will be returned)" }`
  
---

### ***POST /newrecipe***

*  **Request Body:**
 
     ```
   {
      "title": The Best Lasagna,  #required
      "source": "Family Secret",  #required
      "category_id": 1            #required
   }
   ```
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ message: 'Successfully added new recipe to database.' }`    
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ message: 'At least one required field is missing' }`

  OR

  * **Code:** 500 SERVER ERROR <br />
    **Content:** `{ message: "(relevant message will be returned)" }`

---
