const { pool } = require('./config')
const jsonDB = require('./db.json')

const { cleanSIN } = require('../utils')

const { verifyHash, hashString } = require('../utils/crypto.utils')


const useJson = (() => { 
  if (
    process.env.USE_DB !== 'true' ||
    process.env.NODE_ENV === 'test'
  ) {
    pool.end()
    //console.warn includes native code to colour the output— in case you're wondering
    if (process.env.NODE_ENV !== 'test') {
      console.warn('\x1b[33m%s\x1b[0m','⚠ WARNING ⚠: running off of json file instead of local database')
    }

    return true
  } 
    
  return false
})()

var DB = (() => {

  const validateCode = async (code) => {

    if (useJson) {
      return await jsonDB.find(user => verifyHash(code, user.code, true)) || null
    }

    code = hashString(code, true)
    
    const { rows } = await pool.query('SELECT * FROM public.access_codes WHERE code = $1', [code])
    
    return rows[0] || null
  }

  const validateUser = async ({ code, sin, dateOfBirth }) => {
    sin = cleanSIN(sin)

    let row

    if (useJson) {
      row = jsonDB.find(user => user.code === code)
    } else {
      //find by access code, and then check sin and dob
      //this is to save us from needing to go through each entry and verify each hash. Pull by the code we already have, and then check the sin and dob hash
      //it saves having to use a static salt everywhere (slight security risk), and lets us use a randomly generated salt
      const { rows } = await pool.query('SELECT * FROM public.access_codes WHERE code = $1', [code])

      row = rows[0]

    }

    if(!verifyHash(sin, row.sin) || !verifyHash(dateOfBirth, row.dob)) {
      return {"error": true}
    }

    return row || null
  }

  return {
    validateCode,
    validateUser,
  }
})()

module.exports = DB
