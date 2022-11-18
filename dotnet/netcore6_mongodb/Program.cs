using MongoDB.Bson;
using MongoDB.Driver;

namespace netcore6_mongodb;

public class Person
{
    public ObjectId Id { get; set; }
    public string Name { get; set; }
    public BsonDocument Properties { get; set; }

    public ICollection<PersonJob> Jobs { get; set; }
}

public class PersonJob
{
    public string Name { get; set; }

    public string Value { get; set; }
}

internal class Program
{
    static void Main(string[] args)
    {
        // Replace the uri string with your MongoDB deployment's connection string.
        MongoClient client = new MongoClient("mongodb://localhost:27017");
        IMongoDatabase database = client.GetDatabase("foo");
        IMongoCollection<Person> collection = database.GetCollection<Person>("bar");
        Person person = new Person
        {
            Id = ObjectId.GenerateNewId(),
            Name = "test",
            Properties = new BsonDocument
            {
                {"age", 30},
                {"birthday", "2020-1-1"},
                {"tags", BsonArray.Create(new[] {"a", "b"})},
            },
            Jobs = new List<PersonJob>
            {
                new() {Name = "work1", Value = "1"},
                new() {Name = "work2", Value = "2"}
            }
        };

        // List<PersonJob> data1 = new List<PersonJob>
        // {
        //     new() {Name = "work1", Value = "1"},
        //     new() {Name = "work2", Value = "2"}
        // };
        // string json1 = Newtonsoft.Json.JsonConvert.SerializeObject(data1);
        // BsonArray doc1 = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonArray>(json1);
        // person.Properties.Add("doc1", doc1);
        //
        // PersonJob data2 = new() {Name = "work1", Value = "1"};
        // string json2 = Newtonsoft.Json.JsonConvert.SerializeObject(data2);
        // BsonDocument doc2 = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(json2);
        // person.Properties.Add("doc2", doc2);
 
        string value = "{}";
        BsonDocument doc3 = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(value);
 
        person.Properties = doc3;
        collection.InsertOne(person);
        
        Console.WriteLine("Hello World!");
    }
}