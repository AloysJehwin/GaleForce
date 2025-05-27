import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',  // Darker black for more contrast
    padding: 15,
    paddingTop: 50,
  },
  compassContainer: {
  alignItems: 'center',
  justifyContent: 'center',
  height: 120,
  width: 120,
  borderRadius: 60,
  borderWidth: 2,
  borderColor: '#ff9800',
  backgroundColor: '#333',
  marginBottom: 10,
  alignSelf: 'center',
},

arrow: {
  width: 40,
  height: 100,
},

  title: {
    fontSize: 26,
    color: '#ffffff',
    fontWeight: '900',
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: '#00000088',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  card: {
    backgroundColor: '#222222',  // lighter than before, for clearer contrast
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 16,
    elevation: 5, // stronger shadow for depth
    shadowColor: '#000',
    shadowOpacity: 0.6,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  valueContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    fontSize: 15,
    marginBottom: 6,
    fontWeight: '600',
    color: '#dddddd',
    textTransform: 'capitalize',
  },
  value: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  chart: {
    marginLeft: 14,
    backgroundColor: 'transparent',
  },
  faultContainer: {
  marginTop: 20,
  padding: 10,
  backgroundColor: '#1c1c1c',
  borderRadius: 10,
},
faultText: {
  color: '#ffcccc',
  fontSize: 14,
  fontWeight: '500',
},

});
