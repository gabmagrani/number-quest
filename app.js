const username = "Gabriela";
const backendurl = "http://denkleistung.de:5050";


const app = Vue.createApp({ // imported in HTML // created in a big object

    mounted() {

        console.log("checkServer")
        fetch(backendurl + '/ping')
            .then(data => this.serverReady = true)
            .catch(err => this.serverReady = false);

    },


    data() { // return the status of elements
        return {
            output: "no output yet",
            serverReady: false,
            gametype: 1,
            guesses: 0,
            currentGuess: 0,
            result: 'go for it!',
            players: [],
            scoreTable: {},
            showOutputSection: false,
            showPlayersSection: false,
            showScoreSection: false,
            showSpecialSection: false,

        };
    },

    methods: {  // is called for the events 

        postGuess: function () {

            console.log("postGuess")
            fetch(backendurl + '/guess', {
                method: 'POST',
                body: JSON.stringify({
                    username: username,
                    game: Number(this.gametype),
                    guess: Number(this.currentGuess),
                }),
            })
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    this.result = data.ResultText;
                    this.guesses = data.TryNumber;
                })
                .catch(err => this.output = err)
                ;
        },

        clearGame: function () { // resets the local ui
            this.result = '';
            this.guesses = 0;
            this.currentGuess = 0;
        },

        playerlist: function () {
            console.log("playerlist")
            fetch(backendurl + '/userlist', {

            })
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    this.players = data;
                })
                .catch(err => {
                    this.output = err;
                    this.showOutputSection = true;
                })
                ;
        },

        getScoreTable: function () {
            console.log("getScoreTable")
            fetch(backendurl + '/scoretable')
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    this.scoreTable = data;
                })
                .catch(err => {
                    this.output = err;
                    this.showOutputSection = true;
                })
                ;
        },

        resetServer: function () { // creates 3 fresh random numbers and clears the scoretable

            

         //your will need a secret key 

          



            
            this.clearGame(); 


        },

        solveAlgorithmically: async function () {
            let min, max, result = 0;
            if (this.gametype == 1) { // === !!!
                min = 10;
                max = 99
            }
            if (this.gametype == 2) {
                min = 100;
                max = 999
            }
            if (this.gametype == 3) {
                min = 1000;
                max = 9999
            }            
            let rounds = 0;            
            for (; result === 0; rounds++) {                
                if (rounds > 100) {
                    break;
                }                
                test = Math.floor((max - min) / 2) + min;                
                const response = await fetch(backendurl + '/guess', {
                    method: 'POST',
                    body: JSON.stringify({
                        username: username,
                        game: Number(this.gametype),
                        guess: test,
                    }),
                })
                const data = await response.json();                // const { data, error } = await to(fetch(backendurl + '/guess', {
                //     method: 'POST',
                //     body: JSON.stringify({
                //         username: username,
                //         game: Number(this.gametype),
                //         guess: test,
                //     }),
                // }))                // if (error) {
                //     this.output = error;
                //     this.showOutputSection = true;
                //     break;
                // }                if (data.Result === 0) {
                    // Winner!
                    result = test
                    this.result = data.ResultText;
                    this.guesses = data.TryNumber;
                    this.currentGuess = result;
                }
                if (data.Result < 0) { // test is too small
                    min = test;
                }
                if (data.Result > 0) { // test is too big
                    max = test;
                }                
                console.log("solveAlgorithmically:", test, rounds, this.gametype, result, data);
        },       
        
    },

            /*
             /* find the interval for a game type (1-3)
            // 10-99,100,99,1000,9999
            //Math.floor cut the decimal after the integres , become more clear
            this is an advanced task.

            Use the regular /guess API with your own algorithm by calling it several times.

            Tip:    start with the full interval and test the middle value by calling the backend.
                    Do this until you get the data.Result === 0 response.

            Pro-Tip:    It is a real brain-teaser (pain-in-the-****) to use nested call backs or promises.
                        This is what async - await was invented for ;)
            
            By the way, don't worry that you may unintentionally launch a denial of service attack against the server, 
            it should be able to handle tens of thousands request per second.

            */

  

        hackServer: function () {

        /*

            this is an advanced task - but you will crack it!

            Call the API and check the error messages, they will help you find the secrets.
        
        */


        }

   



});

app.mount('#app');
