<template>
  <q-page class="flex column">
  	<q-banner class="bg-green-2 text-center">
      User is online.
    </q-banner>
  	<div class="q-pa-md column col justify-end">
  		<q-chat-message
  			v-for="message in messages"
  			:key="message.text"
  		  :name="message.from"
  		  :text="[message.text]"
  		  :sent="message.from == 'me' ? true : false"
  		/>
      <q-chat-message :style="display" >  <div class="q-gutter-md row items-start">  <q-input v-model.number="duration" type="number" filled style="max-width: 200px;max-height: 100px" hint="duration"  />  <q-input v-model.number="amount" type="number" filled style="max-width: 200px;max-height: 100px" hint="amount"  />  <q-input v-model.number="residence" type="number" filled style="max-width: 200px;max-height: 100px" hint="residence"  />  </div>  <div class="q-gutter-md row items-start">  <q-input v-model.number="num_cred" type="number" filled style="max-width: 200px;max-height: 100px" hint="credit number"  />  <q-input v-model.number="num_people" type="number" filled style="max-width: 200px;max-height: 100px" hint="trusted by how many ?"  />  <q-btn color="blue" push @click="checkBalance">  <div class="row items-center no-wrap">  <q-icon left name="money" />  <div class="text-center">Check if I can<br> get a credit </div> </div> </q-btn> </div> </q-chat-message>

      <q-chat-message :style="displayCurrency" >
      <div class="q-gutter-y-md column" style="max-width: 200px !important">
        <p > Please choose the right currencies to convert </p>
        <q-select clearable filled color="purple-12" v-model="fromCurrency" :options="options" label="From" />
        <q-input v-model.number="amountFrom" type="number" filled style="max-width: 200px;" hint="Amount From"  />
        <!-- equivalent -->
        <q-select color="orange" filled v-model="toCurrency" :options="options" label="To">

        </q-select>
        <q-btn color="blue" push @click="convertCurrency">  <div class="row items-center no-wrap">  <q-icon left name="money" />  <div class="text-center"> Convert </div> </div> </q-btn>
      </div>
        </q-chat-message>

    </div>
  	<q-footer elevated>
  	  <q-toolbar>
  	  	<q-form
  	  		class="full-width">
	  	    <q-input
	  	    	v-model="newMessage"
	  	    	bg-color="white"
	  	    	outlined
	  	    	rounded
	  	    	label="Message"
	  	    	dense
            style="width: 50%;"
          >
            <q-btn
              round
              dense
              flat
              @click="sendMessage"
              type="submit"
              color="red"
              icon="send"
              style="position: fixed;right: 50% ;bottom: 1.2%"
            />




<!--                <q-fab-action color="primary" :text-color="MicColor" @click="startRecording" icon="mic" label="voice message" style="position: fixed;right: 35% "/>-->
<!--                <q-file color="grey-3" bg-color="blue" outlined label-color="white" v-model="files" label="Label" counter max-files="12" @click="pickImage" style="position: fixed;right: 12%  ">-->
<!--                  <template v-slot:append>-->
<!--                    <q-icon name="attachment" color="white" />-->
<!--                  </template>-->
<!--                </q-file>-->
<!--            <q-fab-action color="primary"  @click="sendFile" icon="send" label="send File" style="position: fixed;right: 1% "/>-->



                        <q-btn-dropdown
              split
              disable-main-btn
              class="glossy"
              color="primary"
              label="More"
              style="position: fixed;right:10%"
            >
              <q-list>


                <q-item clickable v-close-popup>
                  <q-item-section avatar>
                    <q-fab-action color="primary" :text-color="MicColor" @click="captureAudio" icon="mic" label="" style="position: fixed "/>

                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section avatar>
                    <q-file color="primary" bg-color="primary" outlined label-color="white" v-model="files" label="" counter max-files="12" @click="pickImage" style="position: fixed;max-width: 16%  ">
                      <template v-slot:append>
                        <q-icon name="attachment" color="white" />
                      </template>
                    </q-file>
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section avatar>
                    <q-fab-action color="primary"  @click="sendFile" icon="send" label="" style="position: fixed "/>

                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>

	  	    </q-input>
  	  	</q-form>
  	  </q-toolbar>
  	</q-footer>
  </q-page>
</template>

<script>
  import { VoiceRecorder, VoiceRecorderPlugin, RecordingData, GenericResponse, CurrentRecordingStatus } from 'capacitor-voice-recorder';
  import {Notify} from "quasar";
  import axios from 'axios';

  export default {
	  data() {
	  	return {
        MicColor: 'white',
	  		newMessage: '',
        files: null,
        duration: 0,
        amount: 0,
        residence: 0,
        num_cred: 0,
        num_people: 0,
        display: 'display:none',
        fromCurrency: '',
        toCurrency: '',
        amountFrom: 0,
        displayCurrency: 'display:none',
        options: [
          'AED', 'EUR','TND','EGP','SAR','USD','DZD','CAD','GBP','CHF'
        ],
	  		messages: [
	  			{
	  				text: 'Hey Jim, how are you?',
	  				from: 'me'
	  			},
	  			{
	  				text: 'Good thanks, Danny! How are you?',
	  				from: 'them'
	  			},
	  			{
	  				text: 'Pretty good!',
	  				from: 'me'
	  			}
	  		]
	  	}
	  },
    mounted() {

      console.log("dsqdqsqs")
      this.messages = this.$store.state.messages
      this.sockets.subscribe("chatBotMessage",(data) => {
        console.log("jeééééééé msgggggg")
        console.log(data)
        if(data.message == "formulaire_credit_risk") {
          this.display = 'display:block'
        } else if(data.message == "formulaire_currency_converter") {
          this.displayCurrency = 'display:block'
        }
        else {
          this.messages.push({
            text: data.message,
            from: 'them'
          })
        }

      })


    },
    methods: {
      async convertCurrency() {

        this.$socket.emit("convertCurrency" , {message:{
          amount: this.amountFrom,
          from_c: this.fromCurrency,
          to_c: this.toCurrency
        }, userId: this.$store.state.user.data._id})
        this.displayCurrency = 'display:none'

      },
      checkBalance() {
        this.$socket.emit("checkRisk", {
          message: {
            amount: this.amount,
            residence: this.residence,
            num_cred: this.num_cred,
            num_people: this.num_people,
            duration: this.duration
          },
          userId: this.$store.state.user.data._id
        })
        Notify.create({
          message: "Checking your credit...",
          color: "positive",
          position: "bottom"
        })
        this.display = 'display:none'

      },
      toBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      },
      async sendFile() {
        // console.log("sendFile")
        // console.log(this.files)
        // console.log(await this.toBase64(this.files))
        // this.$socket.emit("createMessage", {message :await this.toBase64(this.files) , type: 'image', userId: this.$store.state.user.data._id})
        navigator.camera.getPicture((imageData) => {
          console.log("zedsdqsdqsdsqdsqqdssqdsqdsqd")
          console.log("data:image/jpeg;base64," + imageData)
          this.$socket.emit("createMessage", {message :"data:image/jpeg;base64," + imageData , type: 'image', userId: this.$store.state.user.data._id})
        }, (message)=> {
          alert('Failed because: ' + message);
        }, { quality: 50,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.PHOTOLIBRARY
        });
      },


      pickImage() {
        console.log("pickImage", this.files)
      },
      captureAudio() {
        navigator.device.capture.captureAudio((audioFiles) => {
          var audioFile = audioFiles[0],
            fileReader = new FileReader(),
            file;
          fileReader.onloadend = (readerEvt) => {
            var base64 = readerEvt.target.result;
            console.log(fileReader.result)
            this.$socket.emit("createMessage", {message :fileReader.result , type: 'audio', userId: this.$store.state.user.data._id})

          };
          //fileReader.reasAsDataURL(audioFile); //This will result in your problem.
          file = new window.File(audioFile.name, audioFile.localURL,
            audioFile.type, audioFile.lastModifiedDate, audioFile.size);
          fileReader.readAsDataURL(file); //This will result in the solution.
        },(err) => {
          console.log(err)
        });
      },
      startRecording() {
        // if (this.MicColor == 'white') {
        //   this.MicColor = 'red'
        //   VoiceRecorder.requestAudioRecordingPermission().then((result) => console.log(result.value)).catch((error) => {
        //     console.log(error)
        //     this.MicColor = 'white'
        //   })
        //   VoiceRecorder.startRecording()
        //     .then((result) => console.log(result.value))
        //     .catch(error => {
        //       console.log(error)
        //       this.MicColor = 'white'
        //     })
        // } else {
        //   this.MicColor = 'white'
        //   VoiceRecorder.stopRecording()
        //     .then((result) => {
        //       console.log(result)
        //       this.$socket.emit("createMessage", {message :result.value.recordDataBase64 , type: 'audio', userId: this.$store.state.user.data._id})
        //
        //     })
        //     .catch(error => console.log(error))
        // }
        console.log("batattatataattataatat")
        this.messages.push({
          text: "dqsdsqdqsd",
          from: 'me'
        })

        var my_media = new Media("myrecording.mp3",
          // success callback
          (data) => {
            console.log(data)
            console.log("playAudio():Audio Success");

            // window.resolveLocalFileSystemURL("file:///myrecording.mp3", (fileEntry) => {
            //
            //   fileEntry.file( (file) => {
            //     var reader = new FileReader();
            //     reader.onloadend = (evt) => {
            //       console.log("Read complete!");
            //       console.log(Base64.encode(evt.target.result));
            //     };
            //     reader.readAsText(file);
            //   })
            // }, (err) => {
            //   console.log("file Entry err " +err.code )
            // })

            // window.resolveLocalFileSystemURL("cdvfile://localhost/persistent/" + "myrecording.mp3",
            //   (file) => {
            //     file.file(function (file) {
            //       var reader = new FileReader();
            //       reader.onloadend = function (evt) {
            //           console.log("batatatatataatatatataatta")
            //         console.log(reader.result);
            //       }
            //       reader.readAsText(file);
            //     }, (err) => {
            //       console.log("file err ;: "+err)
            //     });
            //   }, (err) => {
            //     console.log("file entry err : "+err)
            //   });

            window.requestFileSystem(LocalFileSystem.PERSISTENT, 1024,  (fs) => {

              console.log('file system open: ' + fs.name);
              fs.root.getFile("myrecording.mp3", null,  (fileEntry) => {

                fileEntry.file( async (file) => {
                  return new Promise((resolve, reject) => {
                    const reader = new FileReader();


                    reader.onloadend = async  (evt) => {
                      console.log(reader.result)
                      // console.log(btoa(evt.target.result));
                      this.$socket.emit("createMessage", {message : file.size , type: 'audio', userId: this.$store.state.user.data._id})
                      resolve(reader.result)
                    };

                    reader.readAsDataURL(file);
                    reader.onerror = error => reject(error);
                  });

                }, (err) => {
                  console.log(err)
                });

              }, (err) => {
                console.log("get file err " + err)
              } );

            }, (err) => {
              console.log("fs log "+ err)
            });
          },
          // error callback
          (err) => {
            console.log("playAudio():Audio Error: "+err.message);
          }
        );

        // Play audio
        try {
          my_media.startRecord();
          console.log('mche l record')
        } catch (e) {
          console.log('ma mcheeech l record')
        }

        // Pause after 10 seconds
        setTimeout(async () => {
          console.log("dqsdqsdqsdqsdqsdqdsdqsdsqdsqsqsqsqsqsqsqsqsqsqsqsqsqsqsqsqsqsqsqsqsq")
          my_media.stopRecord();
        }, 3000);

      },
	  	sendMessage(e) {
    		e.preventDefault()
	  		this.messages.push({
	  			text: this.newMessage,
	  			from: 'me'
	  		})
        this.$socket.emit("createMessage", {message :this.newMessage , type: 'text', userId: this.$store.state.user.data._id})

        // setTimeout(() => {
        //   this.messages.push({
        //     text: 'To make a loan you need to be 18 years or older and prepare the required documents mentionned in the website.',
        //     from: 'them'
        //   })
        // }, 1000)

	  	}
	  },
    beforeDestroy() {
      this.$store.commit('SET_MESSAGES', this.messages)
    }
  }
</script>

<style>
</style>
