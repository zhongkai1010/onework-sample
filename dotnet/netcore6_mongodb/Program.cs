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
        MongoClient client = new MongoClient("mongodb://localhost:27017");
        IMongoDatabase database = client.GetDatabase("foo");
        IMongoCollection<Person> collection = database.GetCollection<Person>("bar");

        Person person = new Person
        {
            Id = ObjectId.GenerateNewId(),
            Name = "test",
            Properties = new BsonDocument
            {
                {"age", BsonValue.Create(30)},
                {"birthday", BsonString.Create("2020-1-1")},
                {"tags", BsonArray.Create(new[] {"a", "b"})},
            },
            Jobs = new List<PersonJob>
            {
                new() {Name = "work1", Value = "1"},
                new() {Name = "work2", Value = "2"}
            }
        };

        collection.InsertOne(person);
        Console.WriteLine("Hello World!");
    }
}