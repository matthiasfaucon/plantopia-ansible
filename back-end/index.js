import express from 'express'
import fs from 'fs.promises'
import cors from 'cors'
import { Resend } from 'resend';
import fetch from 'node-fetch'
import 'dotenv/config'

const app = express()
app.use(express.json());
app.use(cors())


const port = 8000

app.get('/genus', async (req, res) => {
  try {
    let data = await fs.readFile('data.json');
    data = JSON.parse(data).data;
    let genus = [];

    // On attend que tous les éléments du tableau soient traités, sinon on la fonction return un tableau vide
    await Promise.all(data.map(async (plant) => {
      if (!genus.find(item => item.id === plant.genus_id)) {
        let genusFromApi = await fetch(`https://trefle.io/api/v1/genus/${plant.genus_id}?token=${process.env.API_TOKEN}`);
        console.log(genusFromApi)
        genusFromApi = await genusFromApi.json();
        if (genusFromApi?.data?.name) {
          genus.push({
            id: plant.genus_id,
            name: genusFromApi.data.name
          });
        }
      }
    }));

    // Si on enlève le return, on obtient un tableau vide en front
    return res.send(genus);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
});


// Get alls plants
app.get('/plants', async (req, res) => {
  let data = await fs.readFile('data.json')
  data = JSON.parse(data).data
  let page = 1
  const perPage = 12

  console.log(req.query.common_name)
  console.log(req.query.genus)
  if (req.query.page) {
    page = parseInt(req.query.page)
  }

  if (req.query.common_name && req.query.common_name !== "" || req.query.genus && req.query.genus !== "") {
    if (req.query.common_name !== "") {
      console.log(req.query.common_name)
      data = data.filter(plant => plant.common_name?.toLowerCase().includes(req.query.common_name?.toLowerCase()))
    }
    
    if (req.query.genus !== "") {
      data = data.filter(plant => plant.genus_id === parseInt(req.query.genus))
    }
  }
  const start = (page - 1) * perPage
  const end = start + perPage
  const totalPages = Math.ceil(data.length / perPage)
  data = data.slice(start, end)
  return res.send({data: data, totalPages : totalPages})
})

app.get('/plants/:id', async (req, res) => {
  // récupérer données de la plante dans le fichier data.json
  let data = await fs.readFile('data.json')
  data = JSON.parse(data).data

  const id = parseInt(req.params.id)
  const plant = data.filter(plant => plant.id === id)[0]
  return res.send(plant)
})

// Create a plant
app.post('/plants', async (req, res) => {
  // ajouter la plante dans le fichier data.json
  let data = await fs.readFile('data.json')
  data = JSON.parse(data).data
  const id = data.length + 1
  req.body.genus_id = parseInt(req.body.genusTab.id)
  req.body.genus = req.body.genusTab.name

  // unset value
  delete req.body.genusTab

  data.push({...req.body, id: id})
  fs.writeFile('data.json', JSON.stringify({data: data}))
  return res.send({message: `Plant added`, code: 201})
})

app.put('/plants/:id', async (req, res) => {
  // modifier la plante dans le fichier data.json
  const id = parseInt(req.params.id)
  let data = await fs.readFile('data.json')
  data = JSON.parse(data).data
  const plant = data.filter(plant => plant.id === id)[0]
  const index = data.indexOf(plant)
  data[index] = {...plant, ...req.body}
  await fs.writeFile('data.json', JSON.stringify({data: data}))
  return res.send({message: `Plant updated`, code: 200})
})

// Delete a plant
app.delete('/plants/:id', async (req, res) => {
  // supprimer la plante dans le fichier data.json
  const id = parseInt(req.params.id);
  let data = await fs.readFile('data.json');
  data = JSON.parse(data).data;
  // supprimer la plante
  data = data.filter(plant => plant.id !== id);
  await fs.writeFile('data.json', JSON.stringify({data: data}));
  return res.send({message: `Plant deleted`, code: 200});
})

app.post('/contact', (req, res) => {
    const resend = new Resend('re_EuyUxcqf_88vZnDybsbX8PJr24dXv3HDz');
    resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'matthias.faucon@eemi.com',
      subject: `[${req.body.name}] - ${req.body.subject}`,
      html: `<b>Mail de :</b> ${req.body.email} 
      <br><br> <b>Message :</b> <br>
      ${req.body.message}`
    });
    return res.send('ok')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})