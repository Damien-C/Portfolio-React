const express = require('express');
const router = express.Router();
const mysql = require('promise-mysql');
const cors = require('cors');

//DB Connection info
const dbconfig = require('../config/db-config.json');
const IMAGEPATH = require('../config/src-config.json');
const dbconfigEnv = dbconfig.dev;
let connection;
let tryConnectCount = 0;


//CORS 설정
router.use(cors());

//DB 연결
dbConnect();


router.get('/projectList', (req, res) => {
    connection.query(`
        SELECT 
        Project.id, 
        Project.name, 
        Project.desc, 
        date_format(Project.dateStart, '%b. %Y') dateStart, 
        date_format(Project.dateEnd, '%b. %Y') dateEnd, 
        ProjectImage.fileName,
        Project.roll,
        Project.skills,
        Company.name company,
        Company.country country
        FROM portfolio.Project
        left join portfolio.ProjectImage on Project.projectImage_id = ProjectImage.id 
        join portfolio.Company on Project.company_id = Company.id
        order by Project.dateEnd desc;
    `, (err, rows) => {
        res.send(rows);
    });
});
router.get('/projectDetail', (req, res) => {
    if(req.query.id){
        connection.query(`select ProjectImage.id, ProjectImage.fileName, Company.name companyName from ProjectImage
        join Project on Project.id = ProjectImage.project_id
        join Company on Company.id = ProjectImage.company_id
        where ProjectImage.project_id = ${req.query.id}
        `, (err, rows) => {
            res.send(rows);
        });
    }
    
});


// Custom Functions
function getExtension(filename) {
	extension = filename.split('.').pop();
	extension = '.' + extension;
    return filename.split('.').pop();
}

async function dbConnect() {
    await mysql.createConnection(dbconfigEnv).then(function (result) {
        connection = result;
        if (result) console.log("DB Conneted");
        if (tryConnectCount > 2)
            postFCM('DB RECONNECT', 'COMPLETE');
        tryConnectCount = 0;
    }).catch((e) => {
        setTimeout(dbConnect, 2000);
        tryConnectCount++;
        if (tryConnectCount == 3) {
            postFCM('DB ERROR!!!', 'Reconnect fail');
        }
    });

    connection.on('error', async function (err) {
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            await dbConnect();
        } else {
            throw err;
        }
    });
}

function getCustOptions(url, path) {
	return {
		uri: url + path,
		method: 'GET',
		gzip: true,
		headers: {
			'referer': url,
			'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4000.3 Safari/537.36'
		},
		json: true

	};
}

function getValueUsingRegex(originalData, chunckRegex, removeFirstRegex, removeLastRegex) {
	let chunckedData = originalData.match(chunckRegex);
	let removedFirst = chunckedData.toString().replace(removeFirstRegex, '');
	let removedLast = removedFirst.replace(removeLastRegex, '');
	return removedLast;
}

module.exports = router;