const API_BASE_URL = 'https://www.thebluealliance.com/api/v3';
const API_KEY = process.env.NEXT_PUBLIC_TBA_API_KEY!;

export interface Team {
  key: string;
  team_number: number;
  nickname: string;
  location_name: string;
  city: string;
  state_prov: string;
  country: string;
  website: string;
  rookie_year: number;
  motto: string;
}

export interface EventSimple {
  key: string;
  name: string;
  event_code: string;
  event_type: number;
  district: {
    abbreviation: string;
    display_name: string;
    key: string;
    year: number;
  };
  city: string;
  state_prov: string;
  country: string;
  start_date: string;
  end_date: string;
  year: number;
}

export interface Award {
  name: string;
  award_type: number;
  event_key: string;
  recipient_list: {
    team_key: string;
    awardee: string;
  }[];
  year: number;
}

export interface TeamEventStatus {
  qual: {
    num_teams: number;
    ranking: {
      rank: number;
      dq: number;
      matches_played: number;
      record: {
        losses: number;
        wins: number;
        ties: number;
      };
      sort_orders: number[];
      qual_average: number;
    };
    sort_order_info: {
      name: string;
      precision: number;
    };
    status: string;
  };
  alliance: {
    name: string;
    number: number;
    backup: {
      out: string;
      in: string;
    };
    pick: number;
  };
  playoff: {
    level: string;
    current_level_record: {
      losses: number;
      wins: number;
      ties: number;
    };
    record: {
      losses: number;
      wins: number;
      ties: number;
    };
    status: string;
  };
  overall_status_str: string;
  next_match_key: string;
  last_match_key: string;
}

async function fetchTeam(teamKey: string): Promise<Team> {
  const response = await fetch(`${API_BASE_URL}/team/${teamKey}`, {
    headers: {
      'X-TBA-Auth-Key': API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching team: ${response.statusText}`);
  }

  const team: Team = await response.json();
  return team;
}

async function fetchTeamEventStatuses(
  teamKey: string,
  year: number,
): Promise<{ [eventKey: string]: TeamEventStatus }> {
  const response = await fetch(
    `${API_BASE_URL}/team/${teamKey}/events/${year}/statuses`,
    {
      headers: {
        'X-TBA-Auth-Key': API_KEY,
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      `Error fetching team event statuses: ${response.statusText}`,
    );
  }

  const statuses: { [eventKey: string]: TeamEventStatus } =
    await response.json();
  return statuses;
}

async function fetchTeamEvents(
  teamKey: string,
  year: number,
): Promise<EventSimple[]> {
  const response = await fetch(
    `${API_BASE_URL}/team/${teamKey}/events/${year}/simple`,
    {
      headers: {
        'X-TBA-Auth-Key': API_KEY,
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Error fetching team events: ${response.statusText}`);
  }

  const events: EventSimple[] = await response.json();
  return events;
}

export function fetchTeamAwards(
  teamKey: string,
  year: number,
): Promise<Award[]> {
  return fetch(`${API_BASE_URL}/team/${teamKey}/awards/${year}`, {
    headers: {
      'X-TBA-Auth-Key': API_KEY,
    },
  }).then(response => {
    if (!response.ok) {
      throw new Error(`Error fetching team awards: ${response.statusText}`);
    }
    return response.json();
  });
}

export { fetchTeam, fetchTeamEvents, fetchTeamEventStatuses };
