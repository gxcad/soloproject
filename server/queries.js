const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
});

const getFoods = (req, res) => {
  pool.query('SELECT * FROM foods ORDER BY id ASC', (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  })
}

const getFoodById = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query('SELECT * FROM foods WHERE id = $1', [id], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  })
}

const createFood = (req, res) => {
  const id = parseInt(req.params.id);
  const {food, expiration} = req.body;

  pool.query('INSERT INTO foods (food, expiration) VALUES ($1, $2)', [food, expiration], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(201).send(`Food added with ID: $(id)`);
  })
};

const updateFood = (req, res) => {
  const id = parseInt(req.params.id)
  const { food, expiration } = req.body;

  pool.query(
    'UPDATE foods SET food = $1, expiration = $2 WHERE id = $3',
    [food, expiration, id],
    (err, results) => {
      if (err) {
        throw err;
      }
      res.status(200).send(`Food modified with ID: ${id}`);
    }
  )
}

const deleteFood = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query('DELETE FROM foods WHERE id = $1', [id], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).send(`Food deleted with ID: ${id}`)
  })
};

module.exports = {
  getFoods,
  getFoodById,
  createFood,
  updateFood,
  deleteFood,
}

