const Database = require('./db')
const createProffy = require('./createProffy')

Database.then(async (db) => {
    // Inserir dados
    proffyValue = {
        name: "Ariel Vieira",
        avatar: "https://avatars1.githubusercontent.com/u/61114074?s=460&u=6baa7176dfb6f4794f993938ec898b2b1f283d11&v=4",
        whatsapp: "987987878",
        bio: "Apreciador de conteúdo inútil",
    }

    classValue = {
        subject: 1,
        cost: "20",
        // O proffy_id virá pelo banco de dados
    }

    classScheduleValues = [
        // Class_id virá pelo banco de dados após cadastrar a aula
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },
        
        {
            weekday: 0,
            time_from: 520,
            time_to: 1220
        }
    ]

    // await createProffy(db, {proffyValue, classValue, classScheduleValues})

    // Consultar dados inseridos

    // Todos os proffys
    const selectedProffys = await db.all("SELECT * FROM proffys")
    // console.log(selectedProffys)

    // Consultar as classes de um determinado professor e trazer junto os dados do professor
    const selectedClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)
    // console.log(selectedClassesAndProffys)

    // O horário que a prssoa trabalha, por exemplo, é das 8h - 18h
    // o horário do time_from (8h) precisa ser menor ou igual ao horário solicitado
    // o time_to precisa ser acima
    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "620"
        AND class_schedule.time_to > "520"
    `)

    console.log(selectClassesSchedules)
})