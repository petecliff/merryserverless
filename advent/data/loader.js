const messages = [
    {
        id: "2020-12-01",
        body: "What could you call an elf who has just won the lottery...?<br />...Welfy!"
    },
    {
        id: "2020-12-02",
        message: "Freshly cut Christmas trees smelling of stars and snow and pine resin—inhale deeply and fill your soul with wintry night. John J Geddes"
    },
    {
        id: "2020-12-03",
        message: "Nothing ever seems too bad, too hard, or too sad when you've got a Christmas tree in the living room. Nora Roberts"
    },
    {
        id: "2020-12-04",
        message: "Probably the reason we all go so haywire at Christmas time with the endless unrestrained and often silly buying of gifts is that we don’t quite know how to put our love into words. Harlan Miller"
    },
    {
        id: "2020-12-05",
        message: "Christmas is forever, not for just one day. For loving, sharing, giving, are not to put away. Norman Wesley Brooks"
    },
    {
        id: "2020-12-06",
        message: "Christmas doesn’t come from a store. Maybe Christmas perhaps means a little bit more. Dr. Seuss"
    },  
    {
        id: "2020-12-07",
        message: "What is Santa’s favourite kind of pizza...?<br />...One that’s deep-pan, crisp and even."
    },
    {
        id: "2020-12-08",
        message: "Gifts of time and love are surely the basic ingredients of a truly merry Christmas. Peg Bracken"
    },
    {
        id: "2020-12-09",
        message: "I love the Christmas-tide, and yet, I notice this, each year I live; I always like the gifts I get, But how I love the gifts I give! Carolyn Wells"
    },
    {
        id: "2020-12-10",
        message: "Why did the red-nosed reindeer help the old lady cross the road...?<br />...It would have been Rudolph him not to."
    },
    {
        id: "2020-12-11",
        message: "I love Christmas, not just because of the presents but because of all the decorations and lights and the warmth of the season. Ashley Tisdale"
    },
    {
        id: "2020-12-12",
        message: "There's something about a Christmas sweater that will always make me laugh. Kristen Wiig"
    },  
    {
        id: "2020-12-13",
        message: "Only the children know what they are looking for. Antoine de Saint-Exupéry"
    },
    {
        id: "2020-12-14",
        message: "If you love a flower which happens to be on a star, it is sweet at night to gaze at the sky. All the stars are a riot of flowers. Antoine de Saint-Exupéry"
    },
    {
        id: "2020-12-15",
        message: "Sometimes all you hear about is the hate, but there is more love in this world than you could possibly imagine. Charlie Mackesy"
    },
    {
        id: "2020-12-16",
        message: "How did Scrooge win the football game...?<br />...The Ghost of Christmas passed."
    },
    {
        id: "2020-12-17",
        message: "What I don't like about office Christmas parties is looking for a job the next day. Phyllis Diller"
    },
    {
        id: "2020-12-18",
        message: "The two most joyous times of the year are Christmas morning and the end of school. Alice Cooper"
    },  
    {
        id: "2020-12-19",
        message: "Kindness is like snow. It beautifies everything it covers. Kahlil Gibran"
    },
    {
        id: "2020-12-20",
        message: "And now here is my secret, a very simple secret: It is only with the heart that one can see rightly; what is essential is invisible to the eye. Antoine de Saint-Exupéry"
    },
    {
        id: "2020-12-21",
        message: "Music is the language of the spirit. It opens the secret of life bringing peace, abolishing strife. Kahlil Gibran"
    },
    {
        id: "2020-12-22",
        message: "Mankind is a great, an immense family. This is proved by what we feel in our hearts at Christmas. Pope John XXIII"
    },
    {
        id: "2020-12-23",
        message: "Christmas always rustled. It rustled every time, mysteriously, with silver and gold paper, tissue paper and a rich abundance of shiny paper, decorating and hiding everything and giving a feeling reckless extravagance. Tove Jansson"
    },
    {
        id: "2020-12-24",
        message: "May you never be too grown up to search the skies on Christmas Eve. Anon."
    },
    {
        id: "2020-12-25",
        message: "Merry Christmas - have a lovely day!"
    } 
]

// Jokes from: https://spana.org/uncategorised/best-christmas-jokes-all-time/


const AWS = require('aws-sdk');
AWS.config.update({region: 'eu-west-1'});
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const loader = async () => {
    await Promise.all(messages.map(
        async (message) => {
            try {
                await load(message);
            } catch (error) {
                console.log(error);
            }
        }
    ));
}

const load = async (message) => {
    const params = {
        TableName: process.env.MESSAGE_TABLE,
        Item: message
    }
    await dynamoDb.put(params).promise();
}

loader().then(console.log('done'));







