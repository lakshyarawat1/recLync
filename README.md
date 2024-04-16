# Reclync - Games Recommendation System

Reclync is a game recommendation system designed to provide personalized game recommendations based on user preferences. The system consists of a front end developed using Vite + React and a backend implemented with Flask framework. Both components are containerized using Docker Compose for easy deployment and management.

## Features

- Personalized game recommendations based on user preferences.
- Frontend interface for users to set their preferences and view recommended games.
- Backend system for processing user preferences and generating recommendations.
- Containerized deployment using Docker Compose for easy setup and scalability.

## Technologies Used

- Frontend:
  - Vite
  - React
- Backend:

  - Flask
  - Python

- Deployment:
  - Docker
  - Docker Compose

## Machine Learning Vs Content Based Filtering

- Integrating machine learning, specifically TF-IDF (Term Frequency-Inverse Document Frequency) vectorization, into our game recommendation system enables us to leverage advanced natural language processing techniques to analyze the textual metadata associated with each game.

- By applying machine learning algorithms such as content-based filtering or collaborative filtering on these feature vectors, we can generate personalized recommendations tailored to individual user preferences

- This approach offers several technical advantages over traditional filtering methods, including the ability to capture nuanced semantic similarities between games, adaptability to evolving user interactions, scalability to large datasets, and the potential to uncover latent connections and patterns within the gaming catalog

## Getting Started

To get started with Reclync, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/lakshyarawat1/Reclync.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Reclync
   ```

3. Build and run the Docker containers using Docker Compose:

   ```bash
   docker-compose up --build
   ```

4. Once the containers are up and running, you can access the frontend interface at `http://localhost:8080`.

## Usage

1. Open your web browser and navigate to `http://localhost:8080`.

![image](/assets/signIn.png)

2. Set your preferences for game recommendations after signIn.

![image](/assets/preferences.png)

3. Navigate to `/` route to view the recommended games based on your preferences.

![image](/assets/image.png)

4. Click on the `Sign Out` button to sign out of the system.

## Development

If you want to contribute to Reclync or customize it further, follow these steps:

1. Install Docker and Docker Compose on your development machine.
2. Clone the repository:

   ```bash
   git clone https://github.com/your-username/Reclync.git
   ```

3. Navigate to the project directory:

   ```bash
   cd Reclync
   ```

4. Make changes to the frontend or backend code as needed.
5. Test your changes locally.
6. Commit your changes and push them to your fork.
7. Submit a pull request detailing the changes you've made.

## Contributors

- [Lakshya](https://github.com/lakshyarawat1)
