const roles = [
  {
    "name": "User",
    "description": "Default role for logged in users. They can only view acronyms and their categories",
    "permissions": [
      "Can view categories",
      "Can view acronyms",
    ]
  },
  {
    "name": "Editor",
    "description": "Users in this role can manage (CRUD) acronyms and their categories",
    "permissions": [
      "Can view categories",
      "Can add categories",
      "Can edit categories",
      "Can delete categories",
      "Can view acronyms",
      "Can add acronyms",
      "Can edit acronyms",
      "Can delete acronyms",
      "Can manage acronym categories"
    ]
  },
  {
    "name": "Operator",
    "description": "Users in this role are in charge of mnaaging other users and their capabilities",
    "permissions": [
      "Can view permissions",
      "Can view roles",
      "Can add roles",
      "Can edit roles",
      "Can delete roles",
      "Can manage role permissions",
      "Can view users",
      "Can add users",
      "Can edit users",
      "Can delete users",
      "Can change user passwords",
      "Can manage user roles",
    ]
  },
  {
    "name": "Admin",
    "description": "Admin users with all rights in the system",
    "permissions": [
      "Can view categories",
      "Can add categories",
      "Can edit categories",
      "Can delete categories",
      "Can view acronyms",
      "Can add acronyms",
      "Can edit acronyms",
      "Can delete acronyms",
      "Can manage acronym categories",
      "Can view categories",
      "Can add categories",
      "Can edit categories",
      "Can delete categories",
      "Can view acronyms",
      "Can add acronyms",
      "Can edit acronyms",
      "Can delete acronyms",
      "Can manage acronym categories",
      "Can view permissions",
      "Can view roles",
      "Can add roles",
      "Can edit roles",
      "Can delete roles",
      "Can manage role permissions",
      "Can view users",
      "Can add users",
      "Can edit users",
      "Can delete users",
      "Can change user passwords",
      "Can manage user roles",
    ]
  }
];

module.exports = roles;