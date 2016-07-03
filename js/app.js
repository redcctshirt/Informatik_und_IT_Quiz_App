var app = angular.module("Informatik_und_IT_Quiz_App", []);
// Variable app definieren

app.controller('QuizController', ['$scope', function($scope) {
    // AppController definieren 
    
    // Eigenschaften festlegen
    /** @type {string} */
    $scope.title = 'Informatik und IT Quiz App - eine Frage, eine richtige Antwort';
    // Titel der App festlegen 
    $scope.questions = questions_data;
    // Quiz-Fragen werden aus der Variable questions_data, die in der Datei questions.js definiert wird, geladen
    /** @type {number} */
    $scope.points = 0;
    // 0 Punkte am Anfang
    /** @type {number} */
    $scope.count_questions = 0;
    // Anzahl der gestellten Fragen	

    $scope.create_question = function() {
    // Funktion def. um eine Frage zu erstellen

        /** @type {number} */
        $scope.random_index = Math.floor(Math.random() * $scope.questions.length);
        // Frage durch eine Zufallszahl (bis Länge der Fragenliste) ermitteln	
        $scope.question = $scope.questions[$scope.random_index];
        // Frage in die Variable question schreiben

        // Antworten in eine zufällige Reihenfolge bringen
        /** @type {number} */
        var i;
        /** @type {number} */
        var answer_random_index;
        /** @type {string} */
        var cache;
        for (i = $scope.question.answers.length; i; i = i - 1) {
            answer_random_index = Math.floor(Math.random() * i);
            // Zufallszahl zwischen 0 und Anzahl der Antworten
            cache = $scope.question.answers[i - 1];
            $scope.question.answers[i - 1] = $scope.question.answers[answer_random_index];
            $scope.question.answers[answer_random_index] = cache;
            // 2 Stellen in der Liste miteinander austauschen
	
            if(i - 1 === $scope.question.correct) {
                $scope.question.correct = answer_random_index;
            } 
            else if(answer_random_index === $scope.question.correct) {
                $scope.question.correct = i - 1;
            };
            // Wenn notwendig dann correct-Index ändern
        };	 

    };  // Ende der create_question-Funktion

    $scope.create_question(); 
    // Funktion ausführen um eine Frage zu erstellen   

    /**
     * @param {number} input_answer - gewählte Antwort vom Benutzer als Index-Nummer.
     */
    $scope.correct_controll = function(input_answer) {
    // Funktion def. um zu kontrollieren ob eine Antwort richtig ist

        if(input_answer === $scope.question.correct) {
            $scope.points = $scope.points + 1;
            // Wenn Antwort richtig - Punkte um 1 erhöhen 
        };
        $scope.count_questions = $scope.count_questions + 1;
        // Anzahl der gestellten Fragen um 1 erhöhen

        $scope.create_question();
        // Funktion ausführen um eine Frage zu erstellen   	

    };  // Ende der corrent_controll-Funktion
    
}]);  // Ende vom Quiz-Controller



