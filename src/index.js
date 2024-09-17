import { buildFixtureTable, updateFixtureTable } from './fixtures';
import { updateStandingsTable } from './standings';

let fixtures, standings;
let round = 1;

document.addEventListener('DOMContentLoaded', async () => {
    fixtures = await fetch('./assets/fixtures.json').then(r => r.json());

    updateStandingsTable(fixtures);
    buildFixtureTable(fixtures);
    updateFixtureTable(round);

    document.getElementById('previous').addEventListener('click', () => updateFixtureTable(--round));
    document.getElementById('next').addEventListener('click', () => updateFixtureTable(++round));

    document.getElementById('show-table').addEventListener('click', evt => {
        if (evt.target.checked) {
            document.getElementById('standings-table').style.visibility = '';
            return;
        }

        document.getElementById('standings-table').style.visibility = 'hidden';
    })
});
