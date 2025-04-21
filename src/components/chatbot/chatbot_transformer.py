# Step 1: Install Required Libraries
# Run the following command in your terminal before executing this script:
# pip install transformers datasets

import json
from transformers import AutoTokenizer, AutoModelForCausalLM, Trainer, TrainingArguments
from datasets import Dataset

# Step 2: Load the Dataset
with open("iris_qa_dataset.json", "r") as f:
    qa_pairs = json.load(f)

# Convert to Hugging Face Dataset
dataset = Dataset.from_dict({
    "question": [pair["question"] for pair in qa_pairs],
    "answer": [pair["answer"] for pair in qa_pairs],
})

# Step 3: Load a Pre-trained Model and Tokenizer
model_name = "gpt2"  # You can use "t5-small" or other models
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

# Step 4: Tokenize the Dataset
def preprocess_function(examples):
    return tokenizer(examples["question"], text_target=examples["answer"], truncation=True, padding="max_length", max_length=128)

tokenized_dataset = dataset.map(preprocess_function, batched=True)

# Step 5: Define Training Arguments
training_args = TrainingArguments(
    output_dir="./results",
    evaluation_strategy="epoch",
    learning_rate=2e-5,
    per_device_train_batch_size=8,
    per_device_eval_batch_size=8,
    num_train_epochs=3,
    weight_decay=0.01,
    logging_dir="./logs",
    logging_steps=10,
)

# Step 6: Define Trainer
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_dataset,
    eval_dataset=tokenized_dataset,
)

# Step 7: Fine-Tune the Model
print("Fine-tuning the model...")
trainer.train()

# Step 8: Save the Fine-Tuned Model
model.save_pretrained("./fine-tuned-iris-model")
tokenizer.save_pretrained("./fine-tuned-iris-model")
print("Fine-tuned model saved to './fine-tuned-iris-model'.")

# Step 9: Test the Fine-Tuned Model
from transformers import pipeline

# Load the fine-tuned model and tokenizer
model = AutoModelForCausalLM.from_pretrained("./fine-tuned-iris-model")
tokenizer = AutoTokenizer.from_pretrained("./fine-tuned-iris-model")

# Create a text generation pipeline
text_generation_pipeline = pipeline(
    "text-generation",
    model=model,
    tokenizer=tokenizer,
    max_length=100,
    temperature=0.7,
)

# Test the model with a sample question
sample_question = "What is IRIS?"
response = text_generation_pipeline(sample_question)
print("Sample Question:", sample_question)
print("Model Response:", response[0]["generated_text"])