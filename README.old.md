# employee-onboarding
High-Level UI Architecture (Real Company Style)
----------------------------------------------------
|  Top Header (Logo | Search | Profile)             |
----------------------------------------------------
| Sidebar |  Dashboard Cards                        |
|         |  Employee Table (Professional)          |
|         |  Add Employee (Modal / Card Form)       |
----------------------------------------------------

STEP-BY-STEP: HOW WE WILL BUILD

STEP 1: Create Enterprise React Setup
        npx create-react-app employee-onboarding
        cd employee-onboarding

STEP 2: Install Industry UI Stack
        npm install axios react-router-dom
        npm install -D tailwindcss postcss autoprefixer
        npx tailwindcss init -p

STEP 3: Use shadcn/ui (Enterprise Components)
        shadcn provides:
        Buttons
        Tables
        Cards
        Forms
        Modals

STEP 4: High-Level Pages (Final App)
    Dashboard
        Total Employees (Card)
        Pending Onboarding (Card)
        Completed Onboarding (Card)
    Employees Page
        Professional table
        Status badge (Pending / Completed)
        Action buttons (Edit / Delete)
    Add Employee
        Card-based form
        Dropdowns from Master APIs
        Submit & Cancel buttons
    Companies
        Clean table
        Company count
        Add / Edit modal

Example: Style Dashboard (Concept)

[ Total Employees ]   [ Pending ]   [ Completed ]
      120                  15             105
