from appwrite.services.storage import Storage
from appwrite.client import Client
from appwrite.query import Query
import os
import configparser
from io import BytesIO
from PIL import Image
from dotenv import load_dotenv

load_dotenv()

def getImages(nImages: int) -> dict[str, list[Image.Image]]:
    """
    Retrieves images from the configured Appwrite S3 bucket.

    Args:
        nImages (int): The maximum number of images to retrieve from the bucket.

    Returns:
        dict[str, list[Image.Image]]: A dictionary where each key is a category (str) and each value is a list of PIL images (list[Image.Image]) belonging to that category.
    """
    # configuring the appwrite client
    client = Client()
    (client
    .set_endpoint(os.environ["APPWRITE_ENDPOINT"]) 
    .set_project(os.environ["APPWRITE_PROJECT_ID"]) 
    .set_key(os.environ["APPWRITE_API_KEY"]) 
    .set_self_signed()
    .set_session("")
    )

    # retrieving names of all files from the storage bucket
    storage = Storage(client)
    allFiles = storage.list_files(bucket_id = os.environ["APPWRITE_BUCKET_ID"], queries = [Query.limit(nImages)])
    allFiles = [file["$id"] for file in allFiles["files"]]

    shortNecklaceIDs = [
        "68e63579002d0fd0557a",
        "68e63bea000ce6ebaaee",
        "68e63e64002f6e34b0ad"
    ]

    longNecklaceIDs = [
        "68e63c940013989934a8",
        "68e62eac0009909b9a32",
        "68e689b10013a68c5ec1",
        "68e690a4002036c35eb1"
    ]
        
    extractedData = {
        "chokers": [x for x in allFiles if x.startswith("CH")],
        "shortNecklaces": [x for x in allFiles if x in shortNecklaceIDs],
        "longNecklaces": [x for x in allFiles if x in longNecklaceIDs],
        "models": [x for x in allFiles if x.startswith("MD")]
    }
    
    # getting PIL images out of the files
    extractedData = {
        x: [
            Image.open(
                BytesIO(
                    storage.get_file_view(
                        bucket_id = os.environ["APPWRITE_BUCKET_ID"],
                        file_id = y
                    )
                )
            ) for y in extractedData[x]
        ] for x in extractedData
    }

    return extractedData



def getConfig(path: str):
    """
    Load configuration from a specified file.

    Args:
        path (str): The path to the configuration file.

    Returns:
        ConfigParser: The loaded configuration object.
    """
    config = configparser.ConfigParser()
    config.read(path)
    return config