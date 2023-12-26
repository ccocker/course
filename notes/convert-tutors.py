import pandas as pd


def csv_to_json(csv_file_path, json_file_path):
    # Read the CSV data
    df = pd.read_csv(csv_file_path)

    # Transform the fields into arrays
    df["phone"] = df["phone"].apply(lambda x: [{"mobile": x}])
    df["email"] = df.apply(
        lambda x: [{"personal": x["p-email"], "RMIT": x["r-email"]}], axis=1
    )
    df["qualification"] = df["qual"].apply(lambda x: [{"highest": x}])

    # Drop the columns that are not needed
    df.drop(
        columns=["id", "p-email", "r-email", "qual", "e-number", "type", "active"],
        inplace=True,
    )

    # Save to a JSON file
    df.to_json(json_file_path, orient="records", lines=False)


# Specify your CSV file path and the desired output JSON file path
csv_file_path = "tutors.csv"
json_file_path = "tutors.json"

# Convert the CSV to JSON
csv_to_json(csv_file_path, json_file_path)

print(f"CSV data has been converted to JSON and saved to {json_file_path}")
