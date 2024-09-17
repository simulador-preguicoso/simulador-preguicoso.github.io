import { updateStandingsTable } from './standings';

const table = document.getElementById('fixtures-table');
const tableBody = table.querySelector('tbody');
const roundTitle = document.getElementById('round');
const prevButton = document.getElementById('previous');
const nextButton = document.getElementById('next');

const ROWS_PER_PAGE = 10;

const fixturesRows = [];

function buildFixtureTable(fixtures) {
    for (const fixture of fixtures.response) {
        const row = document.createElement('tr');

        const homeCell = document.createElement('td');
        homeCell.appendChild(createTeamImage(fixture.teams.home.logo));
        row.appendChild(homeCell);

        const drawCell = document.createElement('td');
        drawCell.textContent = 'Empate';
        row.appendChild(drawCell);

        const awayCell = document.createElement('td');
        awayCell.appendChild(createTeamImage(fixture.teams.away.logo));
        row.appendChild(awayCell);

        fixturesRows.push(row);

        if (fixture.fixture.status.short === 'FT') {
            row.classList.add('ft');

            if (fixture.teams.home.winner) {
                homeCell.classList.add('result');
                continue;
            }
            if (fixture.teams.away.winner) {
                awayCell.classList.add('result');
                continue;
            }
            drawCell.classList.add('result');
            continue;
        }

        homeCell.addEventListener('click', () => {
            fixture.fixture.status.short = 'FT';
            fixture.teams.home.winner = true;
            fixture.goals.home = 1;
            fixture.teams.away.winner = null;
            fixture.goals.away = 0;

            homeCell.classList.add('result');
            awayCell.classList.remove('result');
            drawCell.classList.remove('result');

            updateStandingsTable(fixtures);
        });

        awayCell.addEventListener('click', () => {
            fixture.fixture.status.short = 'FT';
            fixture.teams.home.winner = null;
            fixture.goals.home = 0;
            fixture.teams.away.winner = true;
            fixture.goals.away = 1;

            homeCell.classList.remove('result');
            awayCell.classList.add('result');
            drawCell.classList.remove('result');

            updateStandingsTable(fixtures);
        });

        drawCell.addEventListener('click', () => {
            fixture.fixture.status.short = 'FT';
            fixture.teams.home.winner = null;
            fixture.goals.home = 0;
            fixture.teams.away.winner = null;
            fixture.goals.away = 0;

            homeCell.classList.remove('result');
            awayCell.classList.remove('result');
            drawCell.classList.add('result');

            updateStandingsTable(fixtures);
        });
    }
}

function createTeamImage(url) {
    const teamImg = document.createElement('img');
    teamImg.src = url;
    teamImg.classList.add('team-logo');

    return teamImg;
}

function updateFixtureTable(round) {
    const startIndex = (round - 1) * ROWS_PER_PAGE;
    const endIndex = startIndex + ROWS_PER_PAGE;

    const rows = fixturesRows.slice(startIndex, endIndex);

    roundTitle.innerHTML = `Rodada ${round}`;
    roundTitle.style.backgroundColor = rows.some(r => !r.classList.contains('ft')) ? '#FFC96F' : '#ACD793';

    tableBody.innerHTML = '';
    rows.forEach(row => tableBody.appendChild(row));

    prevButton.disabled = round === 1;
    nextButton.disabled = round === Math.ceil(fixturesRows.length / ROWS_PER_PAGE);
}

export {
    buildFixtureTable,
    updateFixtureTable
}