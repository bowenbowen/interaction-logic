// Error: Parse error on line 1:
// var myClasses = {	"
// ^
// Expecting 'STRING', 'NUMBER', 'NULL', 'TRUE', 'FALSE', '{', '[', got 'undefined'

// You probably have an extra comma at the end of your list. Something like: ["a", "b", ]

var myClasses = {
	"a_his_of_design": {
		"code": "IXG-5030-A",
		"instructor": "Wehrle, N",
		"time": "W 6:00 PM - 8:50 PM",
		"dates": "10/23/2019 - 12/4/2019",
		"location": "136 W 21 St 307F (Studio)"
	},
	"research_method": {
		"code": "IXG-5080-A",
		"instructor": "Nanayakkara, H",
		"time": "W 6:00 PM - 8:50 PM",
		"dates": "9/4/2019 - 10/16/2019",
		"location": "136 W 21 St 307F (Studio)"
	},
	"service_design": {
		"code": "IXG-5190-A",
		"instructor": "Sitten, M",
		"time": "T 6:00 PM - 8:50 PM",
		"dates": "9/3/2019 - 12/10/2019",
		"location": "136 W 21 St 308F (Studio)"
	},
	"product/service": {
		"code": "IXG-5280-A",
		"instructor": ["Lappin, C", "Mader, R"],
		"time": "M 6:00 PM - 8:50 PM",
		"dates": "9/9/2019 - 12/16/2019",
		"location": "136 W 21 St 307F (Studio)"
	},
	"physical_comp": {
		"code": "IXG-5380-A",
		"instructor": "Forman, E",
		"time": "T 2:00 PM - 4:50 PM",
		"dates": "9/3/2019 - 12/10/2019",
		"location": "132 W 21 St 722E (Studio)"
	},
	"interactn_logic": {
		"code": "IXG-5470-A",
		"instructor": ["Kengle, C","Kruse, B"],
		"time": "Th 2:00 PM - 4:50 PM",
		"dates": "9/5/2019 - 12/17/2019",
		"location": "36 W 21 St 307F (Studio)"
	}
};

