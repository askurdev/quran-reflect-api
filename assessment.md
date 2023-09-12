Project Idea :

I Plan to Implement a Rest API for a Al-Quran-Reflect Application System and 10+different Language and Translation Arabic to Bangla and English. Adding to Quran and Hadith Books and its open to over all publicly to Read .Several special option will be available .User all most log in with email and password .Publicly any searching documents Number and its easy to found. And log in user can be post Islamic Article . Finally Admin can manage all overall Create, Post, Update, Upload, Delete, Approved Article etc.

- Project Name: Al-Quran Application System
  1. Introduction
     The Al-Quran REST API Application is a collection of public API endpoints that enables Admin and users to create, manage, and interact with a single author Article. The backend application provides authentication functionality, allows users to create and view translation and articles, and upload cover photos for articles. This document outlines the functional and non-functional requirements for the development of the Al-Quran REST API Application .

2.  System Overview
    The Al-Quran REST API Application aims to provide a seamless user experience while ensuring the security and integrity of register data .Its allows to brows article and Books without authentication and Administration have access to an admin dashboard for managing article ,upload Books and update others system .
3.  Functional Requirements
    a. Authentication - Users should be able to register for an account by providing their email address and a secure password. - Users should be able to log in securely using their email address and password. - Administrators should be able to log in securely using their credentials.

         b. User Management

- Admin can create new users
- Admin can see a list of users
- Admin can update or delete users
- Admin can change password for any user

  c. Translation Management

- Any users should be able to view Arabic translation and Article .
- Admin can Manage Translation .

  c. Cover Photo Management

- Authenticated user Should be able to upload and update a cover photo for their article .
- Admin can Manage Everything and Approved .

<aside>
<img src="/icons/light-bulb_yellow.svg" alt="/icons/light-bulb_yellow.svg" width="40px" /> What we need to store?

</aside>

- User
  - id - int
  - name - string
  - email - string
  - password - string (hashed)
  - role - enum [user, admin] default user
  - status - enum [pending, approved, block, decline]
  - timestamp
- Article
  - id - int
  - title - string
  - body - text
  - cover - string
  - status - enum [draft, published] default draft
  - author Id - relation with user
  - timestamp
- Comment
  - id - int
- body - text
- author Id - relation with user
- article Id - relation with article
- status - enum [public, private]
- timestamp
- Translation

  - id - int
  - body - String
  - author Id - relation with user
  - article Id - relation with article
  - status - enum [public, private]
  - timestamp

    <aside>
  <img src="/icons/light-bulb_yellow.svg" alt="/icons/light-bulb_yellow.svg" width="40px" /> How to store data?

</aside>

Add the ER Diagram image here

- API Endpoints
  **Namespaces**
  - Public - Anyone with the API access
  - Admin / Private - Internal use only (restricted, different CORS policy)
  - Quranic_Reflect Endpoints
    - **Create an** Quranic_Reflect
      - **HTTP Method:** POST
      - **Endpoint:** **`/api/`**Quranic_Reflect
      - **Authentication Required:** Yes
      - **Description:** Allows authenticated users to create a new Islamic article.
      - **Request Body:** Should include the article's title, content, and any other relevant information.
      - **Response:** Returns the created article with a unique identifier.
      - **Get List of** Quranic_Reflect
        - **HTTP Method:** GET
        - **Endpoint:** **`/api/`**Quranic_Reflect
        - **Authentication Required:** No
        - **Description:** Retrieves a list of Islamic articles.
        - **Response:** Returns a list of articles, including their titles and brief descriptions. This endpoint is accessible to both authenticated and unauthenticated users.
      - **Get a Specific** Quranic_Reflect
        - **HTTP Method:** GET
        - **Endpoint:** **`/api/`**Quranic_Reflect**`/{`**Quranic_Reflect**`_id}`**
        - **Authentication Required:** No
        - **Description:** Retrieves a specific Islamic article by its unique identifier.
        - **Response:** Returns the requested article, including its title, content, and any other relevant information. This endpoint is accessible to both authenticated and unauthenticated users.
      - **Update an Article**
        - **HTTP Method:** PUT
        - **Endpoint:** **`/api/`**Quranic_Reflects**`/{`**Quranic_Reflect**`_id}`**
        - **Authentication Required:** Yes
        - **Description:** Allows authenticated users to update an existing Islamic article.
        - **Request Body:** Should include the updated content of the article.
        - **Response:** Returns the updated article.
      - **Delete an Article**
        - **HTTP Method:** DELETE
        - **Endpoint:** **`/api/`**Quranic_Reflects**`/{`**Quranic_Reflect**`_id}`**
        - **Authentication Required:** Yes
        - **Description:** Allows authenticated users to delete an Islamic article.
        - **Response:** Returns a confirmation message indicating that the article has been deleted.
        - id": "article_id
          **Success Response (HTTP 201 - Created)**
        - content": "Article Content
        - author": "User's Name
        - createdAt": "Timestamp
        - updatedAt": "Timestamp
          Response
          **Error Response (HTTP 400 - Bad Request)**
          **Get List of** Quranic_Reflects **(GET `/api/`**Quranic_Reflects**)**
      - **Success Response (HTTP 200 - OK)**
        id: "article_id_1
        title: "Article Title 1
        summary: Brief summary or excerpt of the article content
        author: User's Name
        createdAt : Timestamp
        id: article_id_2
        title": Article Title 2
        summary": Brief summary or excerpt of the article content
        author": User's Name
        createdAt": Timestamp
        **Update an** Quranic_Reflect **(PUT `/api/`**Quranic_Reflect**`/{`**Quranic_Reflect**`_id}`)**
      - **Success Response (HTTP 200 - OK):**
        id: article_id
        title : Updated Article Title
        content : Updated article content
        author : User's Name
        createdAt : Original Timestamp
        updatedAt : New Timestamp
        **Delete an Article (DELETE `/api/`**Quranic_Reflect**`/{`**Quranic_Reflect**`_id}`)**
      - **Success Response (HTTP 200 - OK):**
        message": "Article has been deleted
        **Error Response (HTTP 404 - Not Found):**
        error": "Article not found
