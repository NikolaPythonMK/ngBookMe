import {Component, OnInit} from "@angular/core";
import {ContactService} from "../../../services/ContactService";
import {NotificationService} from "../../../services/NotificationService";
import {AuthService} from "../../../services/AuthService";
import {SendHelpMessage} from "../../../models/SendHelpMessage";

@Component({
  selector: 'contact-app',
  templateUrl: './contact.component.html',
  styleUrls: ['contact.component.css']
})
export class ContactComponent implements OnInit{

  text: string = '';
  user!: string;

  constructor(private emailService: ContactService,
              private notificationService: NotificationService,
              private authService: AuthService) {}

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.user = user.username;
    });
  }

  onSubmit(): void{
    if(this.text.trim().length > 0){
      this.sendMessage(this.text);
      this.text = '';
    }
  }

  private sendMessage(text: string): void{
    const data = {
      sender: this.user,
      text: text
    } as SendHelpMessage;

    this.emailService.send(data).subscribe({
      next: () => {
        this.notificationService.success("Message Sent Successfully.");

      },
      error: (err) => {
        this.notificationService.error("Something went wrong...");
      }
    })
  }
}
