import os
import csv

# Define the base directory containing the trait folders
base_directory = r"path-to-full-body-peeper-traits"  # Update with your actual path

# Define the output CSV file
output_file = r"path-to-output"  # Update with your desired output location

# Open the CSV file for writing
with open(output_file, 'w', newline='', encoding='utf-8') as csvfile:
    writer = csv.writer(csvfile)
    # Write the header row
    writer.writerow(["Trait Type", "Trait Name"])

    # Walk through the folder structure
    for trait_type in os.listdir(base_directory):
        trait_folder = os.path.join(base_directory, trait_type)
        if os.path.isdir(trait_folder):  # Ensure it's a directory
            for trait_file in os.listdir(trait_folder):
                trait_name, _ = os.path.splitext(trait_file)  # Remove file extension
                writer.writerow([trait_type, trait_name])

print(f"CSV file created successfully: {output_file}")