# GemFit

**GemFit** is an innovative AI-powered virtual try-on solution tailored for the jewelry shopping experience. Built on advanced generative AI technologies, GemFit enables users to virtually try on jewelry items with high-quality visuals and flexibility, offering an immersive shopping experience that brings online jewelry closer to reality.

## Introduction

GemFit is a cutting-edge AI-powered virtual try-on solution designed to transform the jewelry shopping experience. Leveraging advanced diffusion models and computer vision technology, GemFit enables users to visualize how jewelry will look on them with exceptional accuracy and realism. By capturing intricate details and providing a seamless, user-friendly interface, GemFit bridges the gap between in-store and online shopping, empowering customers to make confident purchase decisions. This open-source project offers a powerful tool for developers and researchers interested in enhancing virtual try-on technologies, setting a new standard for immersive, culturally adaptive, and personalized shopping experiences in the jewelry industry.

### Key Technologies Used:
- **Diffusers**: Supports diffusion models for image generation and inpainting, including *stabilityai/stable-diffusion-2-inpainting* for creating realistic and interactive try-ons.
- **OpenCV**: Provides essential computer vision capabilities for image analysis and processing, essential for real-time adjustments and tracking.
- **Pillow**: Facilitates various image manipulation tasks, such as resizing and format conversion.
- **Appwrite**: Backend server that ensures secure data storage and management for GemFit.
- **CVZone**: Simplifies implementation of computer vision modules, like hand tracking, to enhance the try-on experience.
- **Mediapipe**: Adds pre-trained machine learning models for facial and hand tracking, allowing for accurate jewelry placement and a personalized try-on experience.
- **xFormers**: Optimizes memory usage for transformer-based models, enhancing model performance and efficiency for real-time applications.
- **Docker**: Containerizes the application for easy deployment and consistent environments across different platforms.
- **Docker Hub**: Hosts Docker images of GemFit for seamless deployment and sharing.
- **GitHub Actions (CI/CD)**: Configures automated CI/CD to build and push Docker images to Docker Hub on each push, streamlining deployment.
- **Git & GitHub**: Version control and repository management for code collaboration and tracking.

## Features

- **Jewelry Virtual Try-On**: Users can try on jewelry items virtually, achieving a realistic preview before purchase.
- **Customizable Outputs**: Offers flexibility in generated outputs, allowing users to explore different styles and designs interactively.
- **Enhanced Image Generation**: Uses *stabilityai/stable-diffusion-2-inpainting* for high-quality inpainting and generation, creating lifelike representations.
- **Real-Time Tracking and Adjustment**: Leveraging OpenCV and Mediapipe for real-time tracking and precise placement of jewelry items on user images.
- **Scalable & Portable Deployment**: Dockerized for easy scalability and deployment across various environments.

## Benefits

- **User-Centric Shopping Experience**: Offers customers a realistic and personalized try-on experience for informed purchasing decisions.
- **Innovative Design**: Leverages generative AI to push the boundaries of virtual try-on, making it adaptable to future AI advancements.
- **Accessible**: Open-source and easily customizable for events, hackathons, or personal projects.
- **Modular and Extensible**: Designed to be extended with additional features and supports integration with other virtual try-on solutions.

## Getting Started

### Prerequisites

Before setting up GemFit, ensure you have Docker and Git installed. For local development, Python 3.8+ is required.

```bash
# System update
apt-get update && apt-get upgrade -y
```

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/rauhanahmed/GemFit.git
   cd GemFit
   ```

2. **Install dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

3. **Run the Application Locally**:

   ```bash
   python app.py
   ```

   For Docker deployment, build the Docker image and run the container:

   ```bash
   docker build -t gemfit .
   docker run -p 7860:7860 gemfit
   ```

### Configuration

For GPU support, edit the configuration file (`config.ini`) to set:

```ini
device = cuda
```

For CPU-only deployment:

```ini
device = cpu
```

## Environment Variables

To ensure GemFit functions properly with secure storage, I have configured the following environment variables for my personal storage bucket. These variables are essential for the application’s backend operations, and they are specific to my setup:

- `APPWRITE_ENDPOINT`
- `APPWRITE_PROJECT_ID`
- `APPWRITE_API_KEY`
- `APPWRITE_BUCKET_ID`

Note that these configurations are tailored for my personal storage and may not work for other users.

## Directory Structure

Below is a quick view of the project layout:

```
GemFit/
├── .github/
│   └── workflows/
│       └── ci-cd.yaml          # Configuration file for CI/CD workflows, automating tests and deployment
├── src/
│   ├── components/              # Contains modular components for different try-on functionalities
│   │   ├── __init__.py          # Initializes the components module
│   │   ├── clothingTryOn.py     # Module for clothing try-on functionality
│   │   └── necklaceTryOn.py     # Module for necklace try-on functionality
│   ├── pipelines/               # Directory for managing data and processing pipelines
│   │   ├── __init__.py          # Initializes the pipelines module
│   │   └── completePipeline.py  # Main pipeline that combines all try-on functionalities
│   └── utils/                   # Utility functions and helpers for various operations
│       ├── __init__.py          # Initializes the utils module
│       ├── exceptions.py        # Custom exception handling for the application
│       ├── functions.py         # General utility functions used across components
│       └── logger.py            # Logging setup for debugging and tracking application events
├── .env                         # Environment variables for sensitive information like API keys
├── .gitignore                   # Specifies files and directories to ignore in version control
├── app.py                       # Main application entry point, starts the web server
├── config.ini                   # Configuration file for application settings (e.g., device, model settings)
├── Dockerfile                   # Instructions for containerizing the application with Docker
├── LICENSE                      # License file specifying terms of use and distribution
├── README.md                    # Documentation for project overview, setup, and usage instructions
├── requirements.txt             # List of Python dependencies required for the project
└── setup.py                     # Setup script for package installation and distribution
```

## Demo Showcase

### Jewelry Try-On

![Jewelry Try-On](https://github.com/RauhanAhmed/GemFit/blob/main/demo/NecklaceTryOn.png)

### Saree Try-On with Jewelry

![Saree Try-On with Jewelry](https://github.com/RauhanAhmed/GemFit/blob/main/demo/SareeTryOn.png)

## Conclusion

GemFit combines advanced AI with a user-friendly interface, setting new standards in online jewelry shopping and virtual try-on technology. By leveraging powerful diffusion models and real-time tracking, GemFit provides users with a high-quality, accessible solution for jewelry try-on.

## Author Information

- **Email**: rauhaan.siddiqui@gmail.com
- **GitHub**: [RauhanAhmed](https://github.com/RauhanAhmed)
- **LinkedIn**: [Rauhan Ahmed](https://www.linkedin.com/in/rauhan-ahmed)
- **Portfolio**: [rauhanahmed.org](https://rauhanahmed.org)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.