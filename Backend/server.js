import express from 'express';
const app = express();

const port = process.env.PORT || 3000;

// app.get('/', (req, res) => {
//     res.send("Hi how are you!!")
// });

// app.get('/home', (req, res) => {
//     res.send("<h2>Hi Bhavesh</h2>")
// });

app.get('/api/jokes', (req, res) => {
    const jokes = [
        {
            id: 1,
            title: 'Student in class',
            content: 'ek ladka jo ki collage to aata tha but oo kabhi class ke liye class me nahi gaya.'
        },
        {
            id: 2,
            title: 'Market',
            content: 'Today time ethonal market is very well grow up indian govt invest a huge amount buget in 2024 ethonal market.'
        },
        {
            id: 3,
            title: 'Criket',
            content: 'BCCI is a strong member of ICC Board.'
        },
        {
            id: 4,
            title: 'IPL team CSK',
            content: 'According to the report in 2024 CSK team caption MS.Dhoni'
        },
        {
            id: 5,
            title: 'MI',
            content: 'Rohit leads the MI team in 2024'
        },
        {
            id: 6,
            title: 'My Data',
            content: 'Hi i am Jone i am a  Docter.'
        },
        {
            id: 7,
            title: 'Holi',
            content: 'Hamare yaha pr Holi ko badi hi dhum dham se manaya jata hai'
        }
    ];
    res.send(jokes);
}),

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
});