const axios = require('axios')
const colors = require('colors')
const fs = require('fs')
const moment = require('moment')

console.log(`  ############################################`.green)
console.log(`  ____    ____.__              __________                     `.green)
console.log(`  \\  \\ /   /|__| _____   ____\\______   \\ ____  ______ ______`.green)
console.log(`   \\  Y  n / |  |/     \\_/ __ \\|    |  _//  _ \\/  ___//  ___/`.green)
console.log(`    \\     /  |  |  Y Y  \\  ___/ |    |   (  <_> )___ \\ \\___ \\ `.green)
console.log(`     \\___/   |__|__|_|  /\\___  >______  /\\____/____  >____  >`.green)
console.log(`                      \\/     \\/       \\/           \\/     \\/ `.green)
console.log(``);
console.log("        ~ Coded by CharkosOff <3 ~".brightGreen);
console.log(``);
console.log(`  ############################################\n\n`.green)
start()


const bosses = 
[
    {
        string: '[Client thread/INFO]: [CHAT] Королевский зомби был повержен',
        time: 20 * (60 * 1000),
        friendly_time: `20 минут`,
        boss: 'Королевский зомби'
    }, 
    {
        string: '[Client thread/INFO]: [CHAT] Сточный слизень был повержен',
        time: 45 * (60 * 1000),
        friendly_time: `45 минут`,
        boss: 'Сточный слизень'
    }, 
    {
        string: '[Client thread/INFO]: [CHAT] Матка была повержена',
        time: 90 * (60 * 1000),
        friendly_time: `1.5 часа`,
        boss: 'Матка'
    },
    {
        string: '[Client thread/INFO]: [CHAT] Йети был повержен',
        time:  3 * (60 * (60 * 1000)),
        friendly_time: `3 часа`,
        boss: 'Йети'
    },
    
    {
        string: '[Client thread/INFO]: [CHAT] Коровка из Коровёнки была повержена',
        time:  2.5 * (60 * (60 * 1000)),
        friendly_time: `2.5 часа`,
        boss: 'Коровка из Коровёнки'
    },
    {
        string: '[Client thread/INFO]: [CHAT] Левиафан был повержен',
        time:  2.5 * (60 * (60 * 1000)),
        friendly_time: `2.5 часа`,
        boss: 'Левиафан'
    },
    {
        string: '[Client thread/INFO]: [CHAT] Небесный владыка был повержен',
        time: 5* (60 * (60 * 1000)),
        friendly_time: `5 часов`,
        boss: 'Небесный владыка'
    }, 
    {
        string: '[Client thread/INFO]: [CHAT] Хранитель подводного мира был повержен',
        time: 5* (60 * (60 * 1000)),
        friendly_time: `5 часов`,
        boss: 'Хранитель подводного мира'
    }, 
    {
        string: '[Client thread/INFO]: [CHAT] Холуй был повержен',
        time: 45 * (60 * 1000),
        friendly_time: `45 минут`,
        boss: 'Холуй'
    }, 
    
     

]
async function stringLog(){
    const log = `./last.txt`;
    return new Promise((resolve, reject) => {
        if(fs.existsSync(log)){
            fs.readFile(log, "utf8", (err, data) => {
                resolve(data)
            })
        }
    })

} 
async function check(){
    const log = process.env.APPDATA + '/.vimeworld/minigames/logs/latest.log';

    if(fs.existsSync(log)){
        fs.readFile(log, "utf8", async (err, data) => {
            
            const logString = await stringLog();
            let delim = data.split("\n");
            let string = delim[delim.length-2];

            if(logString == string) return;

            fs.open("last.txt", "w", (err) => {
                fs.appendFile(
                  "last.txt",
                  string,
                  (err) => {
                    if (err) throw err;
                  }
                );
            });
            for(let i = 0; i < bosses.length; i++){
                if(string.indexOf(bosses[i]['string']) !== -1){
                    let time = moment().unix() + (bosses[i]['time'] / 1000);

                    console.log(`Босс \"${bosses[i]['boss']}\" появится в ${moment.unix(time).format("DD.MM.YYYY hh:mm:ss")} (через ${bosses[i]['friendly_time']}). За 1 минуту до спавна - Вы получите уведомление в программе и звуковое оповещение.`.yellow)
                    
                    setTimeout(async function () {
                        console.log(`\"${bosses[i]['boss']}\" появится через 1 минуту!\x07\x07`.bold.yellow)
                    }, bosses[i]['time'] - 60 * 1000);

                    setTimeout(async function () {
                        console.log(`\"${bosses[i]['boss']}\" появился. Скорей за добычей!`.bold.yellow)
                        setTimeout(async function () {
                            console.log("\x07");
                        }, 1000);
                    }, bosses[i]['time']);
                }
            }
        });
    }
    else{
        console.log(`</> Файл логов отсутствует. Если Вы уверены, что это ошибка - попробуйте перезапустить программу от имени Администратора.`.red)
    }
}

async function start(){
    console.log(`</> Приступаю к поиску боссов!\n`.blue)
    await setInterval(async function () {
        check()
    }, 100);
}