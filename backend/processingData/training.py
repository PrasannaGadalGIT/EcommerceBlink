import torch
from transformers import GPT2Tokenizer, GPT2LMHeadModel, Trainer, TrainingArguments, DataCollatorForLanguageModeling
from datasets import load_dataset


tokenizer = GPT2Tokenizer.from_pretrained("gpt2")
model = GPT2LMHeadModel.from_pretrained("gpt2")


tokenizer.pad_token = tokenizer.eos_token


dataset = load_dataset("json", data_files={"train": "budget_product_recommendations.json"})
dataset = dataset["train"].train_test_split(test_size=0.1)


def tokenize_function(examples):
    return tokenizer(
        [f"{p} {r}" for p, r in zip(examples["prompt"], examples["response"])],
        truncation=True,
        padding="max_length",
        max_length=256
    )

tokenized_datasets = dataset.map(tokenize_function, batched=True)


data_collator = DataCollatorForLanguageModeling(tokenizer=tokenizer, mlm=False)


training_args = TrainingArguments(
    output_dir="./gpt2_ecommerce",
    per_device_train_batch_size=4,
    num_train_epochs=3,
    save_steps=500,
    save_total_limit=2,
    logging_dir="./logs",
    logging_steps=100,
    warmup_steps=500,
    weight_decay=0.01,
    evaluation_strategy="epoch"
)


trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_datasets["train"],
    eval_dataset=tokenized_datasets["test"],  
    tokenizer=tokenizer,
    data_collator=data_collator
)


# trainer.train()

model.save_pretrained("./gpt2_ecommerce")
tokenizer.save_pretrained("./gpt2_ecommerce")


def generate_response(prompt, max_length=100, temperature=0.8, top_k=50, top_p=0.95):
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model.to(device)  

   
    if tokenizer.pad_token is None:
        tokenizer.pad_token = tokenizer.eos_token  

    
    inputs = tokenizer(prompt, return_tensors="pt", padding=True, truncation=True).to(device)

    
    output = model.generate(
        inputs["input_ids"],
        attention_mask=inputs["attention_mask"],
        max_length=max_length,
        temperature=temperature, 
        top_k=top_k, 
        top_p=top_p,  
        repetition_penalty=1.2,  
        pad_token_id=tokenizer.pad_token_id  
    )

    return tokenizer.decode(output[0], skip_special_tokens=True)

# Test Response
print(generate_response("What are the best budget mechanical keyboards?"))