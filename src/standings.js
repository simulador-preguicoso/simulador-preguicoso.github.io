const table = document.getElementById('standings-table');
const tableBody = table.querySelector('tbody');

function updateStandingsTable(fixtures) {
    const standings = {};

    for (const fixture of fixtures.response) {
        const homeTeam = fixture.teams.home.name;
        if (!standings[homeTeam]) {
            standings[homeTeam] = { played: 0, wins: 0, draws: 0, losses: 0, points: 0, goalsFor: 0, goalsAgainst: 0 };
        }
        const awayTeam = fixture.teams.away.name;
        if (!standings[awayTeam]) {
            standings[awayTeam] = { played: 0, wins: 0, draws: 0, losses: 0, points: 0, goalsFor: 0, goalsAgainst: 0 };
        }

        if (fixture.fixture.status.short === 'FT') {
            standings[homeTeam].played++;
            standings[homeTeam].goalsFor += fixture.goals.home;
            standings[homeTeam].goalsAgainst += fixture.goals.away;
            standings[awayTeam].played++;
            standings[awayTeam].goalsFor += fixture.goals.away;
            standings[awayTeam].goalsAgainst += fixture.goals.home;

            if (fixture.teams.home.winner) {
                standings[homeTeam].wins++;
                standings[homeTeam].points += 3;
                standings[awayTeam].losses++;
                continue;
            }

            if (fixture.teams.away.winner) {
                standings[awayTeam].wins++;
                standings[awayTeam].points += 3;
                standings[homeTeam].losses++;
                continue;
            }

            standings[homeTeam].draws++;
            standings[awayTeam].draws++;
            standings[homeTeam].points += 1;
            standings[awayTeam].points += 1;
        }
    }

    const standingsArray = Object.entries(standings).map(([teamName, stats]) => ({
        team: teamName,
        ...stats,
    }));

    standingsArray.sort((a, b) => {
        if (a.points !== b.points) {
            return b.points - a.points;
        }

        if (a.wins !== b.wins) {
            return b.wins - a.wins;
        }

        const goalDiffA = standings[a.team].goalsFor - standings[a.team].goalsAgainst;
        const goalDiffB = standings[b.team].goalsFor - standings[b.team].goalsAgainst;
        return goalDiffB - goalDiffA;
    });

    tableBody.innerHTML = '';
    let position = 1;
    for (const standing of standingsArray) {
        const row = document.createElement('tr');

        const positionCell = document.createElement('td');
        positionCell.textContent = position++;
        row.appendChild(positionCell);

        const teamCell = document.createElement('td');
        teamCell.textContent = standing.team;
        row.appendChild(teamCell);

        const pointsCell = document.createElement('td');
        pointsCell.textContent = standing.points;
        row.appendChild(pointsCell);

        const playedCell = document.createElement('td');
        playedCell.textContent = standing.played;
        row.appendChild(playedCell);

        const wonCell = document.createElement('td');
        wonCell.textContent = standing.wins;
        row.appendChild(wonCell);

        const drawnCell = document.createElement('td');
        drawnCell.textContent = standing.draws;
        row.appendChild(drawnCell);

        const lostCell = document.createElement('td');
        lostCell.textContent = standing.losses;
        row.appendChild(lostCell);

        const goalsForCell = document.createElement('td');
        goalsForCell.textContent = standing.goalsFor;
        row.appendChild(goalsForCell);

        const goalsAgainstCell = document.createElement('td');
        goalsAgainstCell.textContent = standing.goalsAgainst;
        row.appendChild(goalsAgainstCell);

        const goalsDifferenceCell = document.createElement('td');
        goalsDifferenceCell.textContent = standing.goalsFor - standing.goalsAgainst;
        row.appendChild(goalsDifferenceCell);

        tableBody.appendChild(row);
    }

    return standingsArray;
}

export {
    updateStandingsTable
}