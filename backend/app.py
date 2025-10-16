from src.utils.functions import getImages, getConfig
from src.pipelines.completePipeline import Pipeline
import gradio as gr

# initializing the pipeline for clothing and necklace try-ons
pipeline = Pipeline()

# loading a set of images for examples
allImages = getImages(nImages = 100)

# creating a Gradio interface using Blocks
with gr.Blocks(title = "GemFit") as interface:
    # Row for input images
    with gr.Row():
        inputImage = gr.Image(label = "Input Image", type = "pil", image_mode = "RGB", interactive = True)
        selectedNecklace = gr.Image(label = "Selected Necklace", type = "pil", image_mode = "RGBA", visible = False)
        necklaceTryOn = gr.Image(label = "Necklace Try-On", type = "pil", interactive = False)

    # Row for model examples
    with gr.Row():
        gr.Examples(examples = allImages["models"], inputs = [inputImage], label = "Models")

    # Row for choker examples
    with gr.Row():
        gr.Examples(examples = allImages["chokers"], inputs = [selectedNecklace], label = "Chokers")

    # Row for short necklace examples
    with gr.Row():
        gr.Examples(examples = allImages["shortNecklaces"], inputs = [selectedNecklace], label = "Short Necklaces")

    # Row for long necklace examples
    with gr.Row():
        gr.Examples(examples = allImages["longNecklaces"], inputs = [selectedNecklace], label = "Long Necklaces")

    # Row for output images
    with gr.Row():
        outputOne = gr.Image(label = "Output 1", interactive = False)
        outputTwo = gr.Image(label = "Output 2", interactive = False)
        outputThree = gr.Image(label = "Output 3", interactive = False)

    # Row for the submit button
    with gr.Row():
        submit = gr.Button("Enter")

    # Connect input changes to the necklace try-on function
    selectedNecklace.change(fn = pipeline.necklaceTryOn, inputs = [inputImage, selectedNecklace], outputs = [necklaceTryOn])
    
    # Connect the submit button to the clothing try-on function
    submit.click(fn = pipeline.clothingTryOn, inputs = [inputImage, selectedNecklace], outputs = [outputOne, outputTwo, outputThree])

# Launch the Gradio interface with debug mode enabled
config = getConfig(path = "config.ini")
interface.launch(
    server_name = config.get("WEBSERVER", "host"),
    server_port = config.getint("WEBSERVER", "port")
) 