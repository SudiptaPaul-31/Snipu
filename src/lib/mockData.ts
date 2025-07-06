"use client"

import type { Snippet } from "@/app/types"

export const mockSnippets: Snippet[] = [
  {
    id: 1,
    title: "React useState Hook Example",
    code: `import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div className="counter">
      <h2>Count: {count}</h2>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}

export default Counter;`,
    language: "JavaScript",
    description: "A simple React component demonstrating the useState hook for state management",
    authorId: "user1",
    author: {
      id: "user1",
      username: "react_dev",
      walletAddress: "0x71C...3b5",
      bio: "React enthusiast and frontend developer",
      createdAt: new Date("2023-01-10"),
      updatedAt: new Date("2023-06-20"),
    },
    tags: ["React", "Hooks", "useState", "Frontend"],
    createdAt: new Date("2023-05-15"),
    views: 1247,
    copies: 89,
    isBookmarked: true,
    comments: [
      {
        id: 1,
        content: "Great example of useState!",
        createdAt: new Date("2023-05-16"),
        updatedAt: new Date("2023-05-16"),
        authorId: "user2",
        snippetId: 1,
      },
    ],
  },
  {
    id: 2,
    title: "Python List Comprehension",
    code: `# List comprehension examples
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Basic list comprehension
squares = [x**2 for x in numbers]
print(squares)  # [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

# With condition
even_squares = [x**2 for x in numbers if x % 2 == 0]
print(even_squares)  # [4, 16, 36, 64, 100]

# Nested list comprehension
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flattened = [num for row in matrix for num in row]
print(flattened)  # [1, 2, 3, 4, 5, 6, 7, 8, 9]`,
    language: "Python",
    description: "Comprehensive examples of Python list comprehensions with conditions and nested structures",
    authorId: "user3",
    author: {
      id: "user3",
      username: "python_lover",
      walletAddress: "0x92D...7f1",
      bio: "Python developer and data scientist",
      createdAt: new Date("2023-02-15"),
      updatedAt: new Date("2023-07-01"),
    },
    tags: ["Python", "Lists", "Comprehension"],
    createdAt: new Date("2023-06-20"),
    views: 892,
    copies: 45,
    isBookmarked: false,
  },
  {
    id: 3,
    title: "JavaScript Fetch API with Error Handling",
    code: `// Modern fetch with async/await and error handling
async function fetchUserData(userId) {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}

// Usage example
fetchUserData(123)
  .then(user => console.log('User:', user))
  .catch(error => console.error('Failed to fetch user:', error));`,
    language: "JavaScript",
    description: "Complete example of using the Fetch API with proper error handling and async/await",
    authorId: "user1",
    tags: ["API", "Fetch", "JavaScript", "Async"],
    createdAt: new Date("2023-07-10"),
    views: 1156,
    copies: 78,
    isBookmarked: true,
    comments: [
      {
        id: 2,
        content: "Great error handling example!",
        createdAt: new Date("2023-07-11"),
        updatedAt: new Date("2023-07-11"),
        authorId: "user4",
        snippetId: 3,
      },
    ],
  },
  {
    id: 4,
    title: "CSS Flexbox Layout System",
    code: `/* Modern CSS Flexbox Layout */
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  min-height: 100vh;
}

.sidebar {
  flex: 0 0 250px;
  background: #f5f5f5;
  padding: 1rem;
}

.main-content {
  flex: 1;
  padding: 1rem;
}

.footer {
  flex: 0 0 auto;
  background: #333;
  color: white;
  padding: 1rem;
  text-align: center;
}

/* Responsive design */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
  
  .sidebar {
    flex: 0 0 auto;
    width: 100%;
  }
}`,
    language: "CSS",
    description: "Complete CSS Flexbox layout system with responsive design patterns",
    authorId: "user2",
    author: {
      id: "user2",
      username: "css_wizard",
      walletAddress: "0x45E...9c2",
      bio: "CSS specialist and UI designer",
      createdAt: new Date("2023-01-25"),
      updatedAt: new Date("2023-08-10"),
    },
    tags: ["CSS", "Flexbox", "Layout", "Responsive"],
    createdAt: new Date("2023-08-05"),
    views: 743,
    copies: 92,
    isBookmarked: false,
  },
  {
    id: 5,
    title: "SQL Advanced Join Operations",
    code: `-- Advanced SQL JOIN examples
-- Inner Join - Get users with orders
SELECT u.username, u.email, o.order_date, o.total_amount
FROM users u
INNER JOIN orders o ON u.id = o.user_id
WHERE o.order_date >= '2023-01-01';

-- Left Join - Get all users, including those without orders
SELECT u.username, u.email, 
       COALESCE(o.total_amount, 0) as order_total,
       CASE 
         WHEN o.id IS NULL THEN 'No Orders'
         ELSE 'Has Orders'
       END as order_status
FROM users u
LEFT JOIN orders o ON u.id = o.user_id;

-- Self Join - Get user referrals
SELECT u1.username as user_name,
       u2.username as referred_by
FROM users u1
LEFT JOIN users u2 ON u1.referred_by_id = u2.id;

-- Complex Join with aggregation
SELECT u.username,
       COUNT(o.id) as total_orders,
       SUM(o.total_amount) as total_spent,
       AVG(o.total_amount) as avg_order_value
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.username
HAVING COUNT(o.id) > 0
ORDER BY total_spent DESC;`,
    language: "SQL",
    description: "Advanced SQL JOIN operations with real-world examples and aggregations",
    authorId: "user4",
    tags: ["SQL", "Join", "Database", "Query"],
    createdAt: new Date("2023-09-12"),
    views: 567,
    copies: 34,
    isBookmarked: true,
    comments: [
      {
        id: 3,
        content: "Very helpful SQL examples!",
        createdAt: new Date("2023-09-13"),
        updatedAt: new Date("2023-09-13"),
        authorId: "user3",
        snippetId: 5,
      },
    ],
  },
  {
    id: 6,
    title: "TypeScript Generic Utility Functions",
    code: `// TypeScript Generic Utility Functions
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'moderator';
}

// Generic array utility functions
function findById<T extends { id: number }>(items: T[], id: number): T | undefined {
  return items.find(item => item.id === id);
}

function groupBy<T, K extends keyof T>(items: T[], key: K): Record<string, T[]> {
  return items.reduce((groups, item) => {
    const groupKey = String(item[key]);
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(item);
    return groups;
  }, {} as Record<string, T[]>);
}

// Generic API response type
interface ApiResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
}

// Generic async function with error handling
async function fetchData<T>(url: string): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return {
      data,
      status: 'success'
    };
  } catch (error) {
    return {
      data: {} as T,
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Usage examples
const users: User[] = [
  { id: 1, name: 'John', email: 'john@example.com', role: 'admin' },
  { id: 2, name: 'Jane', email: 'jane@example.com', role: 'user' }
];

const user = findById(users, 1);
const usersByRole = groupBy(users, 'role');`,
    language: "TypeScript",
    description: "Advanced TypeScript generic utility functions with practical examples",
    authorId: "user5",
    author: {
      id: "user5",
      username: "ts_expert",
      walletAddress: "0x63F...4a8",
      bio: "TypeScript specialist and full-stack developer",
      createdAt: new Date("2023-03-18"),
      updatedAt: new Date("2023-10-05"),
    },
    tags: ["TypeScript", "Generics", "Utilities", "Types"],
    createdAt: new Date("2023-10-01"),
    views: 923,
    copies: 67,
    isBookmarked: false,
  },
  {
    id: 7,
    title: "Rust Error Handling Patterns",
    code: `// Rust Error Handling with Result and Option
use std::fs::File;
use std::io::{self, Read};

// Custom error type
#[derive(Debug)]
enum MathError {
    DivisionByZero,
    NegativeSquareRoot,
}

impl std::fmt::Display for MathError {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        match self {
            MathError::DivisionByZero => write!(f, "Cannot divide by zero"),
            MathError::NegativeSquareRoot => write!(f, "Cannot take square root of negative number"),
        }
    }
}

impl std::error::Error for MathError {}

// Functions that return Result
fn divide(a: f64, b: f64) -> Result<f64, MathError> {
    if b == 0.0 {
        Err(MathError::DivisionByZero)
    } else {
        Ok(a / b)
    }
}

fn sqrt(x: f64) -> Result<f64, MathError> {
    if x < 0.0 {
        Err(MathError::NegativeSquareRoot)
    } else {
        Ok(x.sqrt())
    }
}

// Chaining operations with ?
fn complex_calculation(a: f64, b: f64, c: f64) -> Result<f64, MathError> {
    let division_result = divide(a, b)?;
    let sqrt_result = sqrt(division_result + c)?;
    Ok(sqrt_result * 2.0)
}

// File reading with error handling
fn read_file_contents(filename: &str) -> Result<String, io::Error> {
    let mut file = File::open(filename)?;
    let mut contents = String::new();
    file.read_to_string(&mut contents)?;
    Ok(contents)
}

fn main() {
    // Using the functions
    match complex_calculation(10.0, 2.0, 6.0) {
        Ok(result) => println!("Result: {}", result),
        Err(e) => println!("Error: {}", e),
    }
    
    // Using unwrap_or for default values
    let result = divide(10.0, 0.0).unwrap_or(0.0);
    println!("Division result with default: {}", result);
}`,
    language: "Rust",
    description: "Comprehensive Rust error handling patterns using Result, Option, and custom error types",
    authorId: "user6",
    tags: ["Rust", "Error Handling", "Result", "Option"],
    createdAt: new Date("2023-10-15"),
    views: 445,
    copies: 23,
    isBookmarked: true,
    comments: [
      {
        id: 4,
        content: "Excellent Rust error handling examples!",
        createdAt: new Date("2023-10-16"),
        updatedAt: new Date("2023-10-16"),
        authorId: "user1",
        snippetId: 7,
      },
    ],
  },
  {
    id: 8,
    title: "Go HTTP Server with Middleware",
    code: `package main

import (
    "encoding/json"
    "fmt"
    "log"
    "net/http"
    "time"
)

// User represents a user in our system
type User struct {
    ID    int    \`json:"id"\`
    Name  string \`json:"name"\`
    Email string \`json:"email"\`
}

// Middleware for logging requests
func loggingMiddleware(next http.HandlerFunc) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        start := time.Now()
        next.ServeHTTP(w, r)
        log.Printf("%s %s %v", r.Method, r.URL.Path, time.Since(start))
    }
}

// Middleware for CORS
func corsMiddleware(next http.HandlerFunc) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Access-Control-Allow-Origin", "*")
        w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
        
        if r.Method == "OPTIONS" {
            w.WriteHeader(http.StatusOK)
            return
        }
        
        next.ServeHTTP(w, r)
    }
}

// Chain multiple middlewares
func chainMiddleware(h http.HandlerFunc, middlewares ...func(http.HandlerFunc) http.HandlerFunc) http.HandlerFunc {
    for i := len(middlewares) - 1; i >= 0; i-- {
        h = middlewares[i](h)
    }
    return h
}

// Handlers
func getUsersHandler(w http.ResponseWriter, r *http.Request) {
    users := []User{
        {ID: 1, Name: "John Doe", Email: "john@example.com"},
        {ID: 2, Name: "Jane Smith", Email: "jane@example.com"},
    }
    
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(users)
}

func healthCheckHandler(w http.ResponseWriter, r *http.Request) {
    response := map[string]string{
        "status": "healthy",
        "time":   time.Now().Format(time.RFC3339),
    }
    
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(response)
}

func main() {
    // Setup routes with middleware
    http.HandleFunc("/users", chainMiddleware(getUsersHandler, loggingMiddleware, corsMiddleware))
    http.HandleFunc("/health", chainMiddleware(healthCheckHandler, loggingMiddleware))
    
    fmt.Println("Server starting on :8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}`,
    language: "Go",
    description: "Complete Go HTTP server with custom middleware for logging, CORS, and request chaining",
    authorId: "user7",
    author: {
      id: "user7",
      username: "gopher",
      walletAddress: "0x87G...5b9",
      bio: "Go developer and backend specialist",
      createdAt: new Date("2023-04-22"),
      updatedAt: new Date("2023-11-05"),
    },
    tags: ["Go", "HTTP", "Server", "Middleware"],
    createdAt: new Date("2023-11-01"),
    views: 678,
    copies: 41,
    isBookmarked: false,
  },
]

export const getSnippetById = (id: number): Snippet | undefined => {
  return mockSnippets.find((snippet) => snippet.id === id)
}

export const getSnippetsByLanguage = (language: string): Snippet[] => {
  return mockSnippets.filter((snippet) => snippet.language.toLowerCase() === language.toLowerCase())
}

export const getSnippetsByTag = (tag: string): Snippet[] => {
  return mockSnippets.filter((snippet) => snippet.tags.some((t) => t.toLowerCase().includes(tag.toLowerCase())))
}

export const searchSnippets = (query: string): Snippet[] => {
  const lowercaseQuery = query.toLowerCase()
  return mockSnippets.filter(
    (snippet) =>
      snippet.title.toLowerCase().includes(lowercaseQuery) ||
      snippet.description?.toLowerCase().includes(lowercaseQuery) ||
      snippet.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)) ||
      snippet.language.toLowerCase().includes(lowercaseQuery),
  )
}

export const getUniqueLanguages = (): string[] => {
  return [...new Set(mockSnippets.map((snippet) => snippet.language))].sort()
}

export const getUniqueTags = (): string[] => {
  const allTags = mockSnippets.flatMap((snippet) => snippet.tags)
  return [...new Set(allTags)].sort()
}
