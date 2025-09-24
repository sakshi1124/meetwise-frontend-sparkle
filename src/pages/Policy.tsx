import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Policy = () => {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="bg-hero-gradient py-16">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
            Privacy Policy & Terms
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your privacy and security are our top priorities. Learn about how we protect 
            your data and the terms of using MeetWise.
          </p>
        </div>
      </section>

      {/* Policy Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-6 max-w-4xl">
          <div className="space-y-8">
            {/* Privacy Policy */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Privacy Policy</CardTitle>
                <p className="text-sm text-muted-foreground">Last updated: March 2024</p>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <h3 className="text-lg font-semibold text-foreground">Data Collection</h3>
                <p className="text-muted-foreground">
                  We collect information you provide directly to us, such as when you create an account, 
                  upload meeting recordings, or contact us for support. This includes your name, email 
                  address, and any content you choose to upload to our platform.
                </p>

                <h3 className="text-lg font-semibold text-foreground mt-6">How We Use Your Information</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Process your meeting recordings to generate summaries</li>
                  <li>Provide, maintain, and improve our services</li>
                  <li>Send you technical notices and support messages</li>
                  <li>Respond to your comments and questions</li>
                </ul>

                <h3 className="text-lg font-semibold text-foreground mt-6">Data Security</h3>
                <p className="text-muted-foreground">
                  We implement appropriate technical and organizational measures to protect your personal 
                  information against unauthorized access, alteration, disclosure, or destruction. All 
                  uploaded recordings are encrypted and processed securely.
                </p>

                <h3 className="text-lg font-semibold text-foreground mt-6">Data Retention</h3>
                <p className="text-muted-foreground">
                  We retain your information only as long as necessary to provide our services or as 
                  required by law. You can delete your account and data at any time through your profile settings.
                </p>
              </CardContent>
            </Card>

            <Separator className="my-8" />

            {/* Terms of Service */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Terms of Service</CardTitle>
                <p className="text-sm text-muted-foreground">Last updated: March 2024</p>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <h3 className="text-lg font-semibold text-foreground">Acceptable Use</h3>
                <p className="text-muted-foreground">
                  You agree to use MeetWise only for lawful purposes and in accordance with these terms. 
                  You are responsible for ensuring you have the right to upload and process any recordings 
                  you submit to our platform.
                </p>

                <h3 className="text-lg font-semibold text-foreground mt-6">User Accounts</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>You must provide accurate and complete information when creating an account</li>
                  <li>You are responsible for maintaining the security of your account credentials</li>
                  <li>You must notify us immediately of any unauthorized use of your account</li>
                </ul>

                <h3 className="text-lg font-semibold text-foreground mt-6">Content Ownership</h3>
                <p className="text-muted-foreground">
                  You retain ownership of all content you upload to MeetWise. By uploading content, you 
                  grant us a limited license to process, analyze, and generate summaries for your use only.
                </p>

                <h3 className="text-lg font-semibold text-foreground mt-6">Limitation of Liability</h3>
                <p className="text-muted-foreground">
                  MeetWise is provided "as is" without warranties of any kind. We shall not be liable for 
                  any indirect, incidental, special, or consequential damages arising from your use of our services.
                </p>

                <h3 className="text-lg font-semibold text-foreground mt-6">Contact Us</h3>
                <p className="text-muted-foreground">
                  If you have any questions about these policies, please contact us at legal@meetwise.com 
                  or through our contact form.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Policy;