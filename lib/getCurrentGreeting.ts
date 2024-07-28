export default function getGreeting() {
	const currentHour = new Date().getHours();
  
	switch (true) {
	  case currentHour < 12:
		return 'Good morning!';
  
	  case currentHour >= 12 && currentHour <= 16:
		return 'Good afternoon!';
  
	  default:
		return 'Good evening!';
	}
  }