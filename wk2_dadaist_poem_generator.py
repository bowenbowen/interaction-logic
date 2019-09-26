# How to Make a Dadaist Poem

# importing "random" for random operations 
import random 

print ("--------------------------------------")
print ("Want to Feel Special?")
print ("No problem! I'll write a poem for you.")
print ("A Dadaist poem, though.")
print ("--------------------------------------")

# variables containing player input info
firstName = raw_input("Darling, what is your first name?: ")
lastName = raw_input(firstName + ", what is your last name?: ")
firstName = firstName.lower()       # convert the cases after the input in steatd of at the same time
lastName = lastName.lower()         # so that in the second promt the original cases are used
fullName = firstName + lastName
nameLength = len(firstName) + len(lastName)

# arrays of random words that are going to be used to make the poem
auxiliaryVerbs = ["be", "do", "have", "will", "shall", "would", "should", "can", "could", "may", "might", "must", "ought"]
verbs = ["signal", "serve", "stir", "pause", "squash", "dust", "concentrate", "dream", "slow", "lie", "fetch", "ask", "prefer", "copy", "mix", "hurry", "guess"]
randomNouns = ["gene", "guidance", "thanks", "reflection", "mode", "chemistry", "beer", "skill", "hall", "politics", "science", "priority", "dinner", "consequence", "industry", "grocery", "debt", "ratio", "currency", "recognition"]

aWords = ["admirability", "apache", "asparagus", "aloneness", "adventure", "assassin", "aliveness"]
bWords = ["bee", "brilliance", "berry", "blue", "broccoli", "brainstorm", "butterfly"]
cWords = ["cafe", "chimpanzee", "core", "choke", "costume", "citizen", "coup"]
dWords = ["dozen", "dawn", "diamond", "decoration", "duke", "descent", "dome"]
eWords = ["echo", "estate", "entry", "expansion", "economist", "ego", "egg white"]
fWords = ["fibre", "float", "freshman", "fireplace", "fitness", "forestry", "funeral"]
gWords = ["girlfriend", "government", "gossip", "grimace", "gas pedal", "grandfather", "guerrilla"]
hWords = ["helicopter", "hell", "hobby", "harass", "hemisphere", "honor", "harvest"]
iWords = ["initiative", "illusion", "impact", "instinct", "investment", "ignorance", "issue"]
jWords = ["jockey", "jest", "jelly", "joystick", "jury", "jacket", "jail"]
kWords = ["kill", "kidnap", "kitchen", "knee", "knock", "knot", "knowledge"]
lWords = ["leadership", "language", "lion", "location", "layer", "layout", "laboratory"]
mWords = ["magnitude", "medal", "miscarriage", "mail carrier", "moving", "marine", "migration"]
nWords = ["night", "nerve", "needle", "noise", "node", "nap", "nut"]
oWords = ["option", "old age", "obligation", "offense", "overall", "opera", "orientation"]
pWords = ["policy", "palace", "panel", "parachute", "photography", "pony", "practice"]
qWords = ["question", "quality", "quote", "queen", "quarter", "quarrel", "quest"]
rWords = ["rescue", "regret", "relationship", "riot", "restrain", "rotation", "relaxation"]
sWords = ["sofa", "satellite", "salmon", "sex", "sniff", "stem", "sweater"]
tWords = ["transmission", "toss", "temperature", "trip", "timetable", "terminal", "tax"]
uWords = ["unit", "understanding", "urgency", "uniqueness", "user", "union", "upset"]
vWords = ["view", "van", "vat", "volunteer", "veil", "vision", "vain"]
wWords = ["waist", "wilderness", "well", "worm", "war", "wheat", "wound"]
xWords = ["X-ray", "xerotic", "xylitol", "xanthic", "xeroxed", "xerosis", "xenopus"]
yWords = ["yard", "youth", "year", "yolk", "yearning", "yourselves", "yellow"]
zWords = ["zero", "zone", "zigzags", "zipping", "zecchin", "zephyrs", "zine"]


# functions
# https://www.geeksforgeeks.org/random-numbers-in-python/
def chooseAuxiliaryVerbs():
  result = auxiliaryVerbs[random.randrange(0, 12, 1)]  
  return(result)

def chooseVerbs():
  result = verbs[random.randrange(0, 16, 1)]  
  return(result)

def chooseNouns():
  result = randomNouns[random.randrange(0, 19, 1)]  
  return(result)

def chooseWord(i):        # a function used to choose a randome word starting with the input letter
  if(fullName[i]=='a'):   # is there a more elegant way to write this function?
    result = aWords[random.randrange(0, 6, 1)]  
  if(fullName[i]=='b'):
    result = bWords[random.randrange(0, 6, 1)]  
  if(fullName[i]=='c'):
    result = cWords[random.randrange(0, 6, 1)] 
  if(fullName[i]=='d'):
    result = dWords[random.randrange(0, 6, 1)] 
  if(fullName[i]=='e'):
    result = eWords[random.randrange(0, 6, 1)] 
  if(fullName[i]=='f'):
    result = fWords[random.randrange(0, 6, 1)] 
  if(fullName[i]=='g'):
    result = gWords[random.randrange(0, 6, 1)] 
  if(fullName[i]=='h'):
    result = hWords[random.randrange(0, 6, 1)] 
  if(fullName[i]=='i'):
    result = iWords[random.randrange(0, 6, 1)] 
  if(fullName[i]=='j'):
    result = jWords[random.randrange(0, 6, 1)] 
  if(fullName[i]=='k'):
    result = kWords[random.randrange(0, 6, 1)] 
  if(fullName[i]=='l'):
    result = lWords[random.randrange(0, 6, 1)] 
  if(fullName[i]=='m'):
    result = mWords[random.randrange(0, 6, 1)] 
  if(fullName[i]=='n'):
    result = nWords[random.randrange(0, 6, 1)] 
  if(fullName[i]=='o'):
    result = oWords[random.randrange(0, 6, 1)] 
  if(fullName[i]=='p'):
    result = pWords[random.randrange(0, 6, 1)] 
  if(fullName[i]=='q'):
    result = qWords[random.randrange(0, 6, 1)] 
  if(fullName[i]=='r'):
    result = rWords[random.randrange(0, 6, 1)] 
  if(fullName[i]=='s'):
    result = sWords[random.randrange(0, 6, 1)] 
  if(fullName[i]=='t'):
    result = tWords[random.randrange(0, 6, 1)] 
  if(fullName[i]=='u'):
    result = uWords[random.randrange(0, 6, 1)] 
  if(fullName[i]=='v'):
    result = vWords[random.randrange(0, 6, 1)] 
  if(fullName[i]=='w'):
    result = wWords[random.randrange(0, 6, 1)] 
  if(fullName[i]=='x'):
    result = xWords[random.randrange(0, 6, 1)] 
  if(fullName[i]=='y'):
    result = yWords[random.randrange(0, 6, 1)] 
  if(fullName[i]=='z'):
    result = zWords[random.randrange(0, 6, 1)] 
  return(result)


print ("---------- Here goes your poem: ----------")

# https://stackoverflow.com/questions/4264634/more-pythonic-way-to-run-a-process-x-times
for _ in range(nameLength):    # the number of times the the loop get run depends on the length of the play's name 

  possibility = random.randrange(0, 100, 1)    # control the chance something happens

  if(possibility <= 20):
    sentence = (chooseWord(_) + " " + chooseAuxiliaryVerbs() + " " + chooseVerbs() + " " + chooseNouns())
    print (sentence.capitalize())
  elif(possibility > 20 and possibility <= 40):     
    sentence = chooseWord(_) + ", " + chooseWord(_) + ", " + chooseWord(_)
    print (sentence.capitalize())
  elif(possibility > 40 and possibility <= 60):
    sentence = chooseWord(_) + " " + chooseVerbs() + " " + chooseWord(_) + " " + chooseVerbs() + " " + chooseWord(_)
    print (sentence.capitalize())
  else:
    print ((chooseWord(_)).capitalize())




